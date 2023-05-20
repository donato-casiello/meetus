from django.urls import path

from . import views

app_name = "text"

urlpatterns = [
    path("", views.index, name="index"),
]
