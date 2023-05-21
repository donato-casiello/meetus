import json

from django.shortcuts import render
from django.http import JsonResponse

from .models import Message


def index(request):
    return render(request, "text/index.html")

def feed(request):
    messages = Message.objects.all().order_by("-timestamp")
    context = {
        "messages" : messages
    }
    return render(request, "text/feed.html", context)

def add_message(request):
    if request.method == "POST":
        data = json.loads(request.body)
        body = data["body"]
        name = data["name"]
        message = Message.objects.create(
            body = body,
            name = name
        )
        message.save()
        # return JsonResponse({"message":"Succesfully create message", "data":data, "body":body}, safe=False)
        return JsonResponse(message.serialize(), safe=False)

    
    
    
    
    