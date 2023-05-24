from django.test import TestCase
from django.urls import reverse, resolve

from text.views import index, feed, add_message


# Test urls
class TestUrls(TestCase):
    
    def test_index_url(self):
        url = reverse("text:index")
        self.assertEquals(resolve(url).func, index)
        
        
    def test_feed_url(self):
        url = reverse("text:feed")
        self.assertEquals(resolve(url).func, feed)
        
    def test_add_message_url(self):
        url = reverse("text:add_message")
        self.assertEquals(resolve(url).func, add_message)
