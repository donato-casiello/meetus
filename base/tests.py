from django.test import TestCase, SimpleTestCase
from django.urls import reverse, resolve
from base.views import index


# Testing the urls
class TestUrls(SimpleTestCase):
    
    def test_index_url_is_resolved(self):
        url = reverse("base:index")
        self.assertEquals(resolve(url).func, index)
        
 