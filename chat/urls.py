#chat/urls.py
from django.urls import path, include
from . import views
from chat import consumers

urlpatterns = [
    path("", views.HomeView, name="home"),
    path("groups/<uuid:uuid>/", views.GroupChatView, name="group"),
    path('ws/some_path/', consumers.JoinAndLeave.as_asgi()),
]