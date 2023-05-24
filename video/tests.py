from django.test import TestCase
from django.urls import reverse, resolve

from video.views import lobby, room, getToken, createMember, getMember, deleteMember


# Test urls
class TestUrls(TestCase):
    
    def test_lobby_url(self):
        url = reverse("video:lobby")
        self.assertEquals(resolve(url).func, lobby)
        
    def test_room_url(self):
        url = reverse("video:room")
        self.assertEquals(resolve(url).func, room)
        
    def test_getToken_url(self):
        url = reverse("video:getToken")
        self.assertEquals(resolve(url).func, getToken)
        
    def test_createMember_url(self):
        url = reverse("video:createMember")
        self.assertEquals(resolve(url).func, createMember)
    
    def test_getMember_url(self):
        url = reverse("video:getMember")
        self.assertEquals(resolve(url).func, getMember)
        
    def test_deleteMember_url(self):
        url = reverse("video:deleteMember")
        self.assertEquals(resolve(url).func, deleteMember)
        

