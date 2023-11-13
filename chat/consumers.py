# chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import logging

logger = logging.getLogger(__name__)

class JoinAndLeave(AsyncWebsocketConsumer):
    async def connect(self):
        logger.info("WebSocket connection established")
        await self.accept()

    async def disconnect(self, close_code):
        logger.info("WebSocket connection closed")

    async def receive(self, text_data):
        print("server says client message received: ", text_data)
        if text_data:
            try:
                text_data_json = json.loads(text_data)
                self.send(text_data=json.dumps({"message": "Server sends Welcome"}))
            except json.JSONDecodeError:
                print("Invalid JSON format received.")
        else:
            print("Empty message received.")
