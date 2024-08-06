from django.shortcuts import render
from django.db import connection
from django.db.models import Q


# Create your views here.

# django rest import
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta, date
from rest_framework.permissions import IsAuthenticated

# import json
import json

# Import Model
from .models import optionPrepareReport
from globalMaster.models import bank
from globalMaster.models import branch
from authUser.models import user

# Import Serialisers
from .serializers import optionPrepareReportSerializer
from globalMaster.serializers import bankSerializer
from globalMaster.serializers import branchSerializer
from authUser.serializers import userSerializer

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def List(request):
    DataList = optionPrepareReport.objects.filter().order_by('-id')
    LIST = optionPrepareReportSerializer(DataList, many= True)
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
        checkData = optionPrepareReportSerializer(data= request.data, many=False)
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
    optionPrepareReportUPDATE = optionPrepareReport.objects.get(id= id)
    checkData = optionPrepareReportSerializer(optionPrepareReportUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['POST'])
def dudupeReport(request):
    ReportData = optionPrepareReport.objects.filter(
            Q(flatHousePlotNo=request.data['flatHousePlotNo']) | Q(streetSectorLocal=request.data['streetSectorLocal'])
        )

    # if request.data['districtStatePin'] is not '':
    #     ReportData.filter(districtStatePin=request.data['districtStatePin'])

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data

    return Response(List.data)


@api_view(['GET'])
def Delete(request,id):
    optionPrepareReport.objects.filter(id=id).delete()
    return Response('success')


@api_view(['POST'])
def BankWiseReport(request): 

    caseRecived = request.data.get('caseRecived', False)
    caseSent = request.data.get('caseSent', False)
    casePending = request.data.get('casePending', False)
    caseHold = request.data.get('caseHold', False)

    ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [request.data['from'], request.data['to']]) 
                & Q(bank= request.data['bank']) 
                & Q(branch= request.data['branch'])
            )     
    if caseRecived is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
        )

    if caseSent is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
        )
    
    if casePending is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= "Pending")
        )
    
    if caseHold is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= "Hold")
        )

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        # User 
        if item['preparedBy']:
            userItem = user.objects.filter(id= item['preparedBy']).first()
            userSerialise = userSerializer(userItem, many= False)
            item['preparedByName'] = userSerialise.data
        else:
            item['preparedByName'] = []

        
    return Response(List.data)


@api_view(['POST'])
def StatusWiseReport(request): 
    receiveDate = request.data.get('receiveDate', False)
    sendOnDate = request.data.get('sendOnDate', False)
    status = request.data.get('status', '')
    bank = request.data.get('bank', '')
    branch = request.data.get('branch', '')
    fromDate = request.data.get('from', '')
    fromTo = request.data.get('to', '')
     
    if receiveDate == True:
        if status != '':
            ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bank) & Q(branch= branch) & Q(statusValue= status)
            )
        else:
            ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bank) & Q(branch= branch)
            )
    elif sendOnDate == True:
        if status != '':
            ReportData = optionPrepareReport.objects.filter(
                Q(reportSentOn__range= [fromDate, fromTo]) & Q(bank= bank) & Q(branch= branch) & Q(statusValue= status)
            )
        else:
            ReportData = optionPrepareReport.objects.filter(
                Q(reportSentOn__range= [fromDate, fromTo]) & Q(bank= bank) & Q(branch= branch)
            )
    else:
        if status != '':
            ReportData = optionPrepareReport.objects.filter(
                Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= status)
            ) 
        else:
            ReportData = optionPrepareReport.objects.filter(
                Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
            )


    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        # User 

        if item['preparedBy']:
            userItem = user.objects.filter(id= item['preparedBy']).first()
            userSerialise = userSerializer(userItem, many= False)
            item['preparedByName'] = userSerialise.data
        else:
            item['preparedByName'] = []
    return Response(List.data)

@api_view(['POST'])
def ExecutiveWiseReport(request): 
    collectedBy = request.data.get('collectedBy', False)
    handledBy = request.data.get('handledBy', False)
    executive = request.data.get('executive', '')
    fromDate = request.data.get('from', '')
    fromTo = request.data.get('to', '')
     
    if collectedBy == True:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [fromDate, fromTo]) & Q(collectedBy= executive)
        )
    elif handledBy == True:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [fromDate, fromTo]) & Q(preparedBy= executive)
        )
    else:
        ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo])
            ) 

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        # User 
        if item['preparedBy']:
            userItem = user.objects.filter(id= item['preparedBy']).first()
            userSerialise = userSerializer(userItem, many= False)
            item['preparedByName'] = userSerialise.data
        else:
            item['preparedByName'] = []
    return Response(List.data)

@api_view(['POST'])
def TypeWiseReport(request): 
    bankName = request.data.get('bank', '')
    branchName = request.data.get('branch', '')
    fromDate = request.data.get('from', '')
    fromTo = request.data.get('to', '')
    status = request.data.get('status', '')
    reportType = request.data.get('reportType', '')
     
    if bank != '':

        if branch != '':

            if reportType != '' and status != '':
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(branch= branchName) & Q(report= reportType) & Q(statusValue= status)
                )
            elif reportType != '':
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(branch= branchName) & Q(report= reportType)
                )
            elif status != '':
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(branch= branchName) & Q(statusValue= status)
                )
            else:
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(branch= branchName)
                )

        else:

            if reportType != '' and status != '':
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(report= reportType) & Q(statusValue= status)
                )
            elif reportType != '':
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(report= reportType)
                )
            elif status != '':
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName) & Q(statusValue= status)
                )
            else:
                ReportData = optionPrepareReport.objects.filter(
                    Q(reciptDate__range= [fromDate, fromTo]) & Q(bank= bankName)
                )
    
    else:
        if reportType != '' and status != '':
            ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo]) & Q(report= reportType) & Q(statusValue= status)
            )
        elif reportType != '':
            ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo]) & Q(report= reportType)
            )
        elif status != '':
            ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo]) & Q(statusValue= status)
            )
        else:
            ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [fromDate, fromTo])
            )

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        print(item['bank'])
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        # User 
        if item['preparedBy']:
            userItem = user.objects.filter(id= item['preparedBy']).first()
            userSerialise = userSerializer(userItem, many= False)
            item['preparedByName'] = userSerialise.data
        else:
            item['preparedByName'] = []

        
    return Response(List.data)



