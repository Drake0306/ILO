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
from .models import registrarOffice
from .models import handledBy
from .models import delTable
from .models import differentRemarks
from .models import bank
from .models import branch
from .models import DSA
from .models import fee

# Import Serialisers
from .serializers import registrarOfficeSerializer
from .serializers import handledBySerializer
from .serializers import delTableSerializer
from .serializers import differentRemarksSerializer
from .serializers import bankSerializer
from .serializers import branchSerializer
from .serializers import DSASerializer
from .serializers import feeSerializer


## registrarOffice

@api_view(['GET'])
def registrarOfficeList(request):
    DataList = registrarOffice.objects.filter().order_by('-id')
    LIST = registrarOfficeSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def registrarOfficeCreate(request):
    try:
        checkData = registrarOfficeSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def registrarOfficeUpdate(request,id):
    registrarOfficeUPDATE = registrarOffice.objects.get(id= id)
    checkData = registrarOfficeSerializer(registrarOfficeUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def registrarOfficeDelete(request,id):
    registrarOffice.objects.filter(id=id).delete()
    return Response('success')

## handledBy

@api_view(['GET'])
def handledByList(request):
    DataList = handledBy.objects.filter().order_by('-id')
    LIST = handledBySerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def handledByCreate(request):
    try:
        checkData = handledBySerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def handledByUpdate(request,id):
    handledByUPDATE = handledBy.objects.get(id= id)
    checkData = handledBySerializer(handledByUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def handledByDelete(request,id):
    handledBy.objects.filter(id=id).delete()
    return Response('success')


## delTable

@api_view(['GET'])
def delTableList(request):
    DataList = delTable.objects.filter().order_by('-id')
    LIST = delTableSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def delTableCreate(request):
    try:
        checkData = delTableSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def delTableUpdate(request,id):
    delTableUPDATE = delTable.objects.get(id= id)
    checkData = delTableSerializer(delTableUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def delTableDelete(request,id):
    delTable.objects.filter(id=id).delete()
    return Response('success')

## differentRemarks

@api_view(['GET'])
def differentRemarksList(request):
    DataList = differentRemarks.objects.filter().order_by('-id')
    LIST = differentRemarksSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def differentRemarksCreate(request):
    try:
        checkData = differentRemarksSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def differentRemarksUpdate(request,id):
    differentRemarksUPDATE = differentRemarks.objects.get(id= id)
    checkData = differentRemarksSerializer(differentRemarksUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def differentRemarksDelete(request,id):
    differentRemarks.objects.filter(id=id).delete()
    return Response('success')


## bank

@api_view(['GET'])
def bankList(request):
    DataList = bank.objects.filter().order_by('-id')
    LIST = bankSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def bankCreate(request):
    try:
        checkData = bankSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def bankUpdate(request,id):
    bankUPDATE = bank.objects.get(id= id)
    checkData = bankSerializer(bankUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')


@api_view(['GET'])
def bankDelete(request,id):
    bank.objects.filter(id=id).delete()
    return Response('success')


## branch

@api_view(['GET'])
def branchList(request):
    DataList = branch.objects.filter().order_by('-id')
    LIST = branchSerializer(DataList, many= True)
    for item in LIST.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bankName']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data

    return Response(LIST.data)

@api_view(['POST'])
def branchCreate(request):
    try:
        checkData = branchSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def branchUpdate(request,id):
    branchUPDATE = branch.objects.get(id= id)
    checkData = branchSerializer(branchUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def branchDelete(request,id):
    branch.objects.filter(id=id).delete()
    return Response('success')

## DSA

@api_view(['GET'])
def DSAList(request):
    DataList = DSA.objects.filter().order_by('-id')
    LIST = DSASerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def DSACreate(request):
    try:
        checkData = DSASerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def DSAUpdate(request,id):
    DSAUPDATE = DSA.objects.get(id= id)
    checkData = DSASerializer(DSAUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def DSADelete(request,id):
    DSA.objects.filter(id=id).delete()
    return Response('success')

## fee

@api_view(['GET'])
def feeList(request):
    DataList = fee.objects.filter().order_by('-id')
    LIST = feeSerializer(DataList, many= True)
    for item in LIST.data:
        # Bank
        bankItem = bank.objects.filter(id= item['name']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
    return Response(LIST.data)

@api_view(['POST'])
def feeCreate(request):
    try:
        checkData = feeSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def feeUpdate(request,id):
    feeUPDATE = fee.objects.get(id= id)
    checkData = feeSerializer(feeUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')


@api_view(['GET'])
def feeDelete(request,id):
    fee.objects.filter(id=id).delete()
    return Response('success')




