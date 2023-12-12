#chat/urls.py
from django.urls import path, include
from . import views
from chat import consumers

urlpatterns = [
    #path("", views.HomeView, name="home"),
    #path("groups/<uuid:uuid>/", views.GroupChatView, name="group"),
    path('find_room/', views.does_room_exist),
    path('get_groups/', views.get_groups),
    path('create_group/', views.create_group),
    path('<str:room_name>/', views.room, name='room'),  # IMPORTANT: this has to be the last
]