from django.urls import path
from . import views

app_name = "video"

urlpatterns = [
    path('', views.lobby, name="lobby"), 
    path('room/', views.room, name="room"),
    path("getToken/", views.getToken, name="getToken"),
    path("createMember/", views.createMember, name="createMember"),
    path("getMember/", views.getMember, name="getMember"),
    path("deleteMember/", views.deleteMember, name="deleteMember"),
        ]

