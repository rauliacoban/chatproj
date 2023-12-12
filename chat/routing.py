from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    path('groups/<uuid:uuid>/',consumers.GroupConsumer.as_asgi()),
    re_path(r"chat/ws/group/(?P<group_id>[\w-]+)", consumers.GroupConsumer.as_asgi())
]