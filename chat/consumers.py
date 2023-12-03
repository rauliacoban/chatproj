# chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import channel_layers
from channels.db import database_sync_to_async
import asyncio
import json
import logging
from chat.models import Group, User, Message, Event
from asgiref.sync import sync_to_async
import chat.signal

logger = logging.getLogger(__name__)
class JoinAndLeave(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        print("JOINANDLEAVE connect to " + self.user)
        await self.accept()

    async def disconnect(self, close_code):
        print("JOINANDLEAVE disconnect")
        print("WebSocket connection closed")

    async def receive(self, text_data):
        print("JOINANDLEAVE receive: ", text_data)
        #'''
        text_data = json.loads(text_data)
        type = text_data.get("type", None)
        if type:
            data = text_data.get("data", None)
        
        if type == "leave_group":
            await self.leave_group(data)
        elif type == "join_group":
            print("CALLING join_group:", data)
            await self.join_group(data)
        elif type == "create_group":
            print("CALLING join_group:", data)
            await self.create_group(data)
        #'''

    @database_sync_to_async
    def leave_group(self, group_uuid):
        print("JOINANDLEAVE leave_group", flush=True)
        group = Group.objects.get(uuid=group_uuid)
        group.remove_user_from_group(self.user)
        data = {
            "type":"leave_group",
            "data":group_uuid
        }
        self.send(json.dumps(data))

    @database_sync_to_async
    def join_group(self, group_uuid):
        print("JOINANDLEAVE join_group", flush=True)
        group = Group.objects.get(uuid=group_uuid)
        print(group)
        group.add_user_to_group(self.user)
        data = {
            "type": "join_group",
            "data": group_uuid
        }
        print("JOINANDLEAVE before send", flush=True)
        self.send(json.dumps(data))
        print("JOINANDLEAVE after send", flush=True)

class GroupConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        print("ARRIVED AT GroupConsumer connect", str(self.scope["url_route"]["kwargs"]))
        self.group_uuid = str(self.scope["url_route"]["kwargs"]["group_id"])
        self.group = await database_sync_to_async(Group.objects.get)(uuid = self.group_uuid)
        await self.channel_layer.group_add(
                self.group_uuid,self.channel_name)
        
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        print("    ARRIVED AT GroupConsumer receive ", text_data)
        text_data = json.loads(text_data)
        msg_type = text_data.get("type", None)
        author = text_data.get("author", None)
        
        if msg_type == "text_message":
            text = text_data.get("message", None)
            print("    text_message:", str(text))
            user = await database_sync_to_async(User.objects.get)(username=author)
            message= await database_sync_to_async(Message.objects.create)(
                author = user,
                content = text,
                group =self.group
            )
            await self.channel_layer.group_send(self.group_uuid, {
                "type": "text_message",
                "message": text,
                "author": author,
                "timestamp": str(message.timestamp)
            })

        elif msg_type == "backlog_request":
            groupid = text_data.get("groupid", None)
            #user = await database_sync_to_async(User.objects.get)(author=author)
            messages = await sync_to_async(Message.objects.filter)(group=self.group)
            #await sync_to_async(print)(messages)
            list_msg = await sync_to_async(list)(messages.values())
            msgs_json = []
            
            for msg in list_msg:
                #msga = await sync_to_async(Message.objects.get)(id=msg.id)
                #print(msg)
                author = await database_sync_to_async(User.objects.get)(id=msg['author_id'])
                text = msg['content']
                
                msgs_json.append({
                    "message": text,
                    "author": str(author),
                    "timestamp": str(msg['timestamp'])
                })
                #await sync_to_async (print)(msg.author)
            
            backlog_json = {
                "type":"backlog_messages",
                "items": json.dumps(msgs_json)
            }
            
            #print(backlog_json)
            await self.send(json.dumps(
            backlog_json
        ))
            
        elif msg_type == "userlist_request":
            groupid = self.group_uuid
            x = await sync_to_async(Group.objects.get)(uuid=groupid)
            users = await sync_to_async(list)(x.members.all())

            items = []
            
            for user in users:
                #msga = await sync_to_async(Message.objects.get)(id=msg.id)
                print(user)
                items.append(str(user))
                '''
                author = await database_sync_to_async(User.objects.get)(id=msg['author_id'])
                text = msg['content']
                
                msgs_json.append({
                    "message": text,
                    "author": str(author),
                    "timestamp": str(msg['timestamp'])
                })
                #await sync_to_async (print)(msg.author)
                '''
            
            backlog_json = {
                "type":"userlist",
                "items": json.dumps(items)
            }
            
            print(backlog_json)
            await self.send(json.dumps(
                backlog_json
            ))

    async def text_message(self, event):
        print("ARRIVED AT GroupConsumer text_message")
        print(event)
        message = event["message"]
        author = event.get("author")
        timestamp = event["timestamp"]
        
        returned_data = {
            "type":"text_message",
            "message":message,
            "author":author,
            "timestamp":timestamp
        }
        await self.send(json.dumps(
            returned_data
        ))

    async def event_message(self, event):
        print("ARRIVED AT GroupConsumer event_message")
        message = event.get("message")
        user = event.get("user", None)
        
        await self.send(
            json.dumps({
                    "type":"event_message",
                    "message":message,
                    "status":event.get("status",None),
                    "user":user
            })
        )