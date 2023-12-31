from django.db import models

# Create your models here.
#chat/models.py

from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4

from django.urls import reverse
# Create your models here.

User = get_user_model()


class Group(models.Model):
    '''The group model where multiple users can share and discuss ideas'''
    uuid = models.UUIDField(default=uuid4, editable=False)
    name = models.CharField(max_length=30)
    members = models.ManyToManyField(User)

    def __str__(self) -> str:
        return f"Group {self.name}-{self.uuid}"

    def get_absolute_url(self):
        return reverse("group", args=[str(self.uuid)])

    def add_user_to_group(self, user:User):
        '''A helper function to add a user to a group and create an event object'''
        self.members.add(user)
        self.event_set.create(type="userlist", user=user)
        self.save()

    def remove_user_from_group(self, user:User):
        '''An helper function to remove users from group members when they \
        leave the group and create an event for the timestamp the user left the group'''
        self.members.remove(user)
        self.event_set.create(type="userlist", user=user)
        self.save()
    
    def save(self, *args, **kwargs):
        print("    Group saved")
        super().save(*args, kwargs)

class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    group = models.ForeignKey(Group ,on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        date = self.timestamp.date()
        time = self.timestamp.time()
        return f"{self.author}:- {self.content} @{date} {time.hour}:{time.minute}"
    
    def getTimeString(self):
        date = self.timestamp.date()
        time = self.timestamp.time()
        return f"{date} {time.hour}:{time.minute}"
    
    def save(self, *args, **kwargs):
        print("    Message saved")
        super().save(*args, kwargs)
    
class Event(models.Model):
    '''
    A model that holds all events related to a group like when a user joins the group or leaves.
    '''
    CHOICES = [
        ("userlist", "userlist")
        ]
    type = models.CharField(choices=CHOICES, max_length=10)
    description= models.CharField(help_text="A description of the event that occurred",\
    max_length=50, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group ,on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        print("    Event saved")
        self.description = f"{self.user} {self.type} the {self.group.name} group"
        super().save(*args, kwargs)

    def __str__(self) -> str:
        return f"{self.description}"