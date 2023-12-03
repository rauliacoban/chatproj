from django.dispatch import receiver
from .models import Event, Message, Group
from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync, sync_to_async
import json

@receiver(post_save, sender=Event)
def broadcast_event_to_groups(sender, instance, **kwargs):
    print('        SIGNAL at broadcast_event_to_groups')
    
    print('TYPE:', str(instance.type))
    if instance.type == 'userlist':
        channel_layer = get_channel_layer()
        groupid = str(instance.group.uuid)
        x = Group.objects.get(uuid=groupid)
        users = list(x.members.all())

        items = []
        for user in users:
            print(user)
            items.append(str(user))
        
        backlog_json = {
            "type":"userlist",
            "items": json.dumps(items)
        }
        
        print(backlog_json)
        async_to_sync(channel_layer.group_send)(groupid,
            backlog_json
        )
    
@receiver(post_save, sender=Message)
def signal_message(sender, instance, **kwargs):
    print('        SIGNAL at signal_message')