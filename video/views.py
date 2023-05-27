from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import random
import time
import json

from agora_token_builder import RtcTokenBuilder


from .models import RoomMember

def getToken(request):
    #Build token with uid
    appId = "df7e053f27b14c61b7aac4a0bc5ef2e4"
    appCertificate = "fb8e88adcd63453381f1a4fc7ebae0a0"
    channelName = request.GET.get("channel")
    uid = random.randint(1, 230)
    expirationTimeInSeconds = 3600 * 24
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1 # set to 1 for the host, set 2 for the guests
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({"token" : token, "uid" : uid}, safe=False)

def lobby(request):
    return render(request, "video/lobby.html")

def room(request):
    return render(request, "video/room.html")

@csrf_exempt
def createMember(request):
    data = json.loads(request.body)
    
    member, created = RoomMember.objects.get_or_create(
        name = data["name"],
        uid = data["UID"],
        room_name = data["room_name"],
    )
    
    return JsonResponse({"name" : data["name"]}, safe=False)

def getMember(request):
    uid = request.GET.get("UID")
    room_name = request.GET.get("room_name")
    
    member = RoomMember.objects.get(
        uid=uid, 
        room_name=room_name,
    )
    return JsonResponse({"name":member.name}, safe=False)


@csrf_exempt
def deleteMember(request):
    data = json.loads(request.body)
    
    member = RoomMember.objects.get(
        name = data["name"],
        uid = data["UID"],
        room_name = data["room_name"]
    )
    member.delete()
    return JsonResponse("Member was deleted", safe=False)
