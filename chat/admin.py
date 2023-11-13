from django.contrib import admin

#chat/admin.py

from .models import *
# Register your models here.

admin.site.register(Message)
admin.site.register(Event)
admin.site.register(Group)