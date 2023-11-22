from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/some_path/$', consumers.JoinAndLeave.as_asgi()),
    path('groups/<uuid:uuid>/',consumers.GroupConsumer.as_asgi()),
    re_path(r"chat/ws/group/(?P<group_id>[\w-]+)", consumers.GroupConsumer.as_asgi())
]