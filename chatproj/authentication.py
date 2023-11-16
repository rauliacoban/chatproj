import json
from django.contrib.auth.models import User
from django.contrib import auth, messages
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


@csrf_exempt
@require_http_methods(['POST'])
def login(request):
    print("    AUTHENTICATION login")
    data = json.load(request)
    username = data['username']
    password = data['password']
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request, user)
        response = {
            "success": True,
            "message": "Success",
            "token": get_token(request)
        }
    else:
        response = {
            "success": False,
            "message": "Invalid credentials",
            "token": None
        }
    return HttpResponse(json.dumps(response))


@csrf_exempt
@require_http_methods(['POST'])
def register(request):
    print("    AUTHENTICATION register")
    data = json.load(request)
    username = data['username']
    email = data['email']
    password = data['password']
    try:
        User.objects.create_user(
            username=username, email=email, password=password)
        response = {
            "success": True,
            "message": "Success",
        }
    except Exception as e:
        response = {
            "success": False,
            "message": "Success"
        }
    finally:
        return HttpResponse(json.dumps(response))


def index(request):
    print("    AUTHENTICATION index")
    return render(request, 'chat/lobby.html')

