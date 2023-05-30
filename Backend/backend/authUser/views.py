from django.shortcuts import render
from django.db import connection


# Create your views here.

# django rest import
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta, date

# import json
import json

# Import Model
from .models import user
from .models import permission

# Import Serialisers
from .serializers import userSerializer
from .serializers import permissionSerializer

@api_view(['POST'])
def authCheckLogin(request):
    LIST = []
    try:
        DataList = user.objects.filter(email= request.data['email'], password= request.data['password'], status= 'true').exists()
        if DataList == True:
            USERDATA = user.objects.filter(email= request.data['email'], password= request.data['password']).first()
            USERPERMISSION = permission.objects.filter(name= USERDATA.permission).first()

            LIST = {
                'user': {
                    'name': USERDATA.name,
                    'email': USERDATA.email,
                    'phone': USERDATA.phone,
                    'pic': USERDATA.pic,
                    'org': USERDATA.org,
                    'branch': USERDATA.branch,
                    'permission': USERDATA.permission,
                }
                ,
                'permission':{
                    'name': USERPERMISSION.name,
                    'permissionSet': USERPERMISSION.permissionSet,
                }
            }
            print(LIST)

        else: 
            return Response('User Cannot Be Found')
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response(LIST)

@api_view(['GET'])
def authUserList(request):
    DataList = user.objects.filter().order_by('-id')
    LIST = userSerializer(DataList, many= True)
    return Response(LIST.data)



