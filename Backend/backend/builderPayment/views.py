from django.shortcuts import render
from django.db import connection
from django.db.models import Q
from functools import reduce



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
from .models import builderPayment
from globalMaster.models import bank
from globalMaster.models import branch
# Import Serialisers
from .serializers import builderPaymentSerializer
from globalMaster.serializers import bankSerializer
from globalMaster.serializers import branchSerializer


@api_view(['GET'])
def List(request):
    DataList = builderPayment.objects.filter().order_by('-id')
    LIST = builderPaymentSerializer(DataList, many= True)
    for item in LIST.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
    return Response(LIST.data)

@api_view(['POST'])
def Create(request):
    try:
        checkData = builderPaymentSerializer(data= request.data, many=False)
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
def Update(request,id):
    builderPaymentUPDATE = builderPayment.objects.get(id= id)
    checkData = builderPaymentSerializer(builderPaymentUPDATE, data= request.data, partial=True)
    print(checkData.is_valid())
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')


@api_view(['GET'])
def Delete(request,id):
    builderPayment.objects.filter(id=id).delete()
    return Response('success')

@api_view(['POST'])
def paymentLedgerReport(request):
    # get the ledger user request
    recDate = request.data.get('recDate', False)
    sentDate = request.data.get('sentDate', False)
    pendingStatus = request.data.get('status', 'false')
    if pendingStatus == True: 
        pendingStatus = 'true'
    fromDate = request.data.get('from', '')
    toDate = request.data.get('to', '')
    bank = request.data.get('bank', '')
    branch = request.data.get('branch', '')
    ReportData = []

    # fetch data
    if recDate == True:
        ReportData = builderPayment.objects.filter(
                Q(recDate__range= [fromDate, toDate]) & Q(bank= bank) & Q(branch= branch) & Q(status= pendingStatus) 
            )
    elif sentDate == True:
        ReportData = builderPayment.objects.filter(
                Q(dated__range= [fromDate, toDate]) & Q(bank= bank) & Q(branch= branch) & Q(status= pendingStatus) 
            )

    List = builderPaymentSerializer(ReportData, many= True)

    return Response(List.data)


@api_view(['POST'])
def paymentExecutiveReport(request): 
    ReportData = builderPayment.objects.filter(
                Q(recDate__range= [request.data['from'], request.data['to']])
            )     
    if request.data['executive'] is not '':
        if request.data['collectedBy'] is not False:
            ReportData = builderPayment.objects.filter(
                Q(recDate__range= [request.data['from'], request.data['to']]) & Q(collectedBy= request.data['executive'])
            )

        if request.data['handledBy'] is not False:
            ReportData = builderPayment.objects.filter(
                Q(recDate__range= [request.data['from'], request.data['to']]) & Q(handledByName= request.data['executive'])
            )
    

    
    List = builderPaymentSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        
    return Response(List.data)
