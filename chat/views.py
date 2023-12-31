# chat/views.py
from django.http import HttpResponseForbidden, HttpResponseNotFound, HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import Group
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
import json
from channels.db import database_sync_to_async

@login_required
def HomeView(request):
    print("Arrived at Homeview")
    """The homepage where all groups are listed"""
    groups = Group.objects.all()
    user = request.user
    context = {"groups": groups, "user": user}
    return render(request, template_name="chat/home.html", context=context)


@login_required
def GroupChatView(request, uuid):
    print("Arrived at GroupChatView")
    """The view for a group where all messages and events are sent to the frontend"""

    group = get_object_or_404(Group, uuid=uuid)
    if request.user not in group.members.all():
        return HttpResponseForbidden(
            "You are not a member of this group. Kindly use the join button"
        )

    messages = group.message_set.all()
    """
    messages are the message the members
    of a group send to the group
    """

    events = group.event_set.all()
    """
    events are the messages that indicates
    that a user joined or left the group.
    They will be sent automatically when a user join or leave the group
    """

    # Combine the events and messages for a group
    message_and_event_list = [*messages, *events]

    # Sort the combination by the timestamp so that they are listed in order
    sorted_message_event_list = sorted(
        message_and_event_list, key=lambda x: x.timestamp
    )

    # get the list of all group members
    group_members = group.members.all()

    context = {
        "message_and_event_list": sorted_message_event_list,
        "group_members": group_members,
    }

    return render(request, template_name="chat/groupchat.html", context=context)

@require_http_methods(['GET'])
def does_room_exist(request):
    print("    AM AT does_room_exist")
    group_name = request.GET['groupName']
    if not Group.objects.filter(name=group_name).exists():
        print("      AM AT does_room_exist NO")
        return HttpResponseNotFound()
    print("      AM AT does_room_exist YES")
    return HttpResponse(json.dumps({'number': str(Group.objects.get(name=group_name).uuid)}))

@require_http_methods(['GET'])
def get_groups(request):
    print("    AM AT get_groups")
    groups = Group.objects.all().values()
    
    groups_json = []
    
    for group in groups:
        groups_json.append({
            "id": str(group['uuid']),
            "name": group['name']
        })
    
    response_json = {
        "items": json.dumps(groups_json)
    }
    
    print(response_json)
    return HttpResponse(json.dumps(response_json))

from django.views.decorators.csrf import csrf_exempt

@database_sync_to_async
@require_http_methods(['POST'])
@csrf_exempt
def create_group(request):
    print("      AT CREATE_GROUP")
    csrf_token = request.META.get('HTTP_X_CSRFTOKEN')

    try:
        request_data = json.loads(request.body)
        params = request_data.get('params')
        group_name = params.get('name')
        
        group = Group.objects.create(name=group_name)
        group_id = group.uuid
        group_name = group.name

        print(request_data)
        print(group_id)
        
        # Return a success response
        response_data = {'success': True, 'group_id':str(group_id), 'group_name':str(group_name)}
        return HttpResponse(json.dumps(response_data), content_type='application/json')
    except json.JSONDecodeError:
        # Return an error response for invalid JSON data
        return HttpResponse("Invalid JSON data", status=400, content_type='text/plain')


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})