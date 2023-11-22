#chat/urls.py
from django.urls import path, include
from . import views
from chat import consumers

urlpatterns = [
    #path("", views.HomeView, name="home"),
    #path("groups/<uuid:uuid>/", views.GroupChatView, name="group"),
    path('ws/some_path/', consumers.JoinAndLeave.as_asgi()),
    path('find_room/', views.does_room_exist),
    path('<str:room_name>/', views.room, name='room'),  # IMPORTANT: this has to be the last
]