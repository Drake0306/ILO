from django.shortcuts import render
from django.db import connection
from globalMaster.models import bank, branch, DSA, registrarOffice, differentRemarks, handledBy
from globalMaster.serializers import bankSerializer, branchSerializer, DSASerializer, registrarOfficeSerializer, differentRemarksSerializer, handledBySerializer
from django.db.models import Q


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
from .models import disbursalRegistration
from .models import disbursalBT

# Import Serialisers
from .serializers import disbursalRegistrationSerializer
from .serializers import disbursalBTSerializer

@api_view(['GET'])
def disbursalRegistrationList(request):
    DataList = disbursalRegistration.objects.filter().order_by('-id')
    LIST = disbursalRegistrationSerializer(DataList, many= True)
    for item in LIST.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bankName']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        
        # Branch
        branchItem = branch.objects.filter(id= item['branchName']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
    return Response(LIST.data)

@api_view(['POST'])
def disbursalRegistrationCreate(request):
    try:
        checkData = disbursalRegistrationSerializer(data= request.data, many=False)
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
def disbursalRegistrationUpdate(request,id):
    disbursalRegistrationUPDATE = disbursalRegistration.objects.get(id= id)
    checkData = disbursalRegistrationSerializer(disbursalRegistrationUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def disbursalRegistrationDelete(request,id):
    disbursalRegistration.objects.filter(id=id).delete()
    return Response('success')


@api_view(['GET'])
def disbursalBTList(request):
    DataList = disbursalBT.objects.filter().order_by('-id')
    LIST = disbursalBTSerializer(DataList, many= True)
    for item in LIST.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bankName']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        
        # Branch
        branchItem = branch.objects.filter(id= item['branchName']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
    return Response(LIST.data)

@api_view(['POST'])
def disbursalBTCreate(request):
    try:
        checkData = disbursalBTSerializer(data= request.data, many=False)
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
def disbursalBTUpdate(request,id):
    disbursalBTUPDATE = disbursalBT.objects.filter(id= id).first()
    checkData = disbursalBTSerializer(disbursalBTUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def disbursalBTDelete(request,id):
    disbursalBT.objects.filter(id=id).delete()
    return Response('success')

def disbursalRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate=None, fromTo=None, dateType=None):
    # Creating dictionary filters with condition checks
    common_filters = {
        'bankName': bankName if bankName != '' else None,
        'branchName': branchName if branchName != '' else None,
        'statusValue': pending if pending != '' else None
    }
    # Removing None entries
    common_filters = {k: v for k, v in common_filters.items() if v is not None}

    filters = common_filters.copy()

    if fromDate and fromTo and dateType:
        date_filter = {f'{dateType}__range': [fromDate, fromTo]}
        filters.update(date_filter)

    ReportData = disbursalRegistration.objects.filter(**filters)

    report_list = disbursalRegistrationSerializer(ReportData, many=True)
    for item in report_list.data:
        item['dsaName'] = get_serialized_data(DSA, DSASerializer, item.get('dsa', ''))
        item['registrarOffName'] = get_serialized_data(registrarOffice, registrarOfficeSerializer, item.get('registrarOff', ''))
        item['bankName'] = get_serialized_data(bank, bankSerializer, item.get('bankName', ''))
        item['branchName'] = get_serialized_data(branch, branchSerializer, item.get('branchName', ''))
        item['remarksName'] = get_serialized_data(differentRemarks, differentRemarksSerializer, item.get('remarks', ''))
        item['handledByName'] = get_serialized_data(handledBy, handledBySerializer, item.get('handledBy', ''))

    return report_list


def disbursalBTCALLBACK(bankName, branchName, pending, registrarOff, fromDate=None, fromTo=None, dateType=None):
    # Creating dictionary filters with condition checks
    common_filters = {
        'bankName': bankName if bankName != '' else None,
        'branchName': branchName if branchName != '' else None,
        'statusValue': pending if pending != '' else None
    }
    # Removing None entries
    common_filters = {k: v for k, v in common_filters.items() if v is not None}

    filters = common_filters.copy()

    if fromDate and fromTo and dateType:
        date_filter = {f'{dateType}__range': [fromDate, fromTo]}
        filters.update(date_filter)

    ReportData = disbursalBT.objects.filter(**filters)

    report_list = disbursalBTSerializer(ReportData, many=True)
    for item in report_list.data:
        item['bankName'] = get_serialized_data(bank, bankSerializer, item.get('bankName', ''))
        item['branchName'] = get_serialized_data(branch, branchSerializer, item.get('branchName', ''))
        item['remarksName'] = get_serialized_data(differentRemarks, differentRemarksSerializer, item.get('remarks', ''))
        item['handledByName'] = get_serialized_data(handledBy, handledBySerializer, item.get('handledBy', ''))

    return report_list

@api_view(['POST'])
def DisbursalRegFullReport(request): 
    fromDate = request.data.get('from', '')
    fromTo = request.data.get('to', '')
    bankName = request.data.get('bank', '')
    branchName = request.data.get('branch', '')
    registrarOff = request.data.get('registrarOff', '')
    dateType = request.data.get('dateType', 'registrationDate')

    pending = request.data.get('statusValue', '')

    regiLedger = request.data.get('regiLedger', False)
    loanLedger = request.data.get('loanLedger', False)

    # Use a conditional expression to choose the appropriate callback
    if loanLedger:
        List = disbursalBTCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo, dateType)
    else:
        # Default to disbursalRegCALLBACK if regiLedger is True or neither is True
        List = disbursalRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo, dateType)

    return Response(List.data)



def get_serialized_data(model, serializer, model_id):
    if model_id:
        item = model.objects.filter(id=model_id).first()
        if item:
            return serializer(item, many=False).data
    return None

