from django.urls import path

from . import views

app_name = "text"

urlpatterns = [
    path("", views.index, name="index"),
    path("feed/", views.feed, name="feed"),
    path("add_message/", views.add_message, name="add_message"),
]
