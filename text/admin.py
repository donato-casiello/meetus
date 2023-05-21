from django.contrib import admin

from .models import Message

class AdminMessage(admin.ModelAdmin):
    list_display = ("name", "body", "timestamp")


admin.site.register(Message, AdminMessage)
