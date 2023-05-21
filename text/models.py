from django.db import models

class Message(models.Model):
    name = models.CharField(max_length=200, null=True)
    body = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.body
    
    # Prepare data for API 
    def serialize(self):
        return {
            "name" : self.name,
            "body" : self.body, 
            "timestamp" : self.timestamp, 
        }