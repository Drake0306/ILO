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
from .models import authorityLetter
from .models import depositOfPayment

# Import Serialisers
from .serializers import authorityLetterSerializer
from .serializers import depositOfPaymentSerializer

@api_view(['GET'])
def authorityLettersRegistrationList(request):
    DataList = authorityLetter.objects.filter().order_by('-id')
    LIST = authorityLetterSerializer(DataList, many= True)
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
def authorityLettersRegistrationCreate(request):
    try:
        checkData = authorityLetterSerializer(data= request.data, many=False)
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
def authorityLettersRegistrationUpdate(request,id):
    authorityLetterUPDATE = authorityLetter.objects.get(id= id)
    checkData = authorityLetterSerializer(authorityLetterUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def authorityLettersRegistrationDelete(request,id):
    authorityLetter.objects.filter(id=id).delete()
    return Response('success')


@api_view(['GET'])
def depositOfPaymentList(request):
    DataList = depositOfPayment.objects.filter().order_by('-id')
    LIST = depositOfPaymentSerializer(DataList, many= True)
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
def depositOfPaymentCreate(request):
    try:
        checkData = depositOfPaymentSerializer(data= request.data, many=False)
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
def depositOfPaymentUpdate(request,id):
    depositOfPaymentUPDATE = depositOfPayment.objects.filter(id= id).first()
    checkData = depositOfPaymentSerializer(depositOfPaymentUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def depositOfPaymentDelete(request,id):
    depositOfPayment.objects.filter(id=id).delete()
    return Response('success')

# def disbursalRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo):
#     if bankName != '':

#         if branchName != '':

#             if pending == 'true':

#                 if registrarOff != '':
#                     ReportData = disbursalRegistration.objects.filter(
#                         Q(registrationDate__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName) & Q(status= pending) & Q(registrarOff= registrarOff)
#                     )
#                 else:
#                     ReportData = disbursalRegistration.objects.filter(
#                         Q(registrationDate__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName) & Q(status= pending)
#                     )

#             else:

#                 if registrarOff != '':
#                     ReportData = disbursalRegistration.objects.filter(
#                         Q(registrationDate__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName) & Q(registrarOff= registrarOff)
#                     )
#                 else:
#                     ReportData = disbursalRegistration.objects.filter(
#                         Q(registrationDate__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName)
#                     )

#         else:
#             if pending == 'true':
#                 ReportData = disbursalRegistration.objects.filter(
#                         Q(registrationDate__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(status= 'true')
#                     )
#             else:
#                 ReportData = disbursalRegistration.objects.filter(
#                     Q(registrationDate__range= [fromDate, fromTo]) & Q(bankName= bankName)
#                 )

#     elif registrarOff != '':
#         ReportData = disbursalRegistration.objects.filter(
#                     Q(status= 'true') & Q(registrarOff= registrarOff)
#                 )
#     else:
#         if pending == 'true':
#             ReportData = disbursalRegistration.objects.filter(
#                     Q(registrationDate__range= [fromDate, fromTo]) & Q(status= 'true')
#                 )
#         else:
#             ReportData = disbursalRegistration.objects.filter(
#                     Q(registrationDate__range= [fromDate, fromTo])
#                 )

    

#     List = disbursalRegistrationSerializer(ReportData, many= True)
#     for item in List.data:
#         # dsaName
#         if item['dsa'] != '':
#             dsaItem = DSA.objects.filter(id= item['dsa']).first()
#             dsaSerialise = DSASerializer(dsaItem, many= False)
#             item['dsaName'] = dsaSerialise.data
#         # registrarOffName
#         if item['registrarOff'] != '':
#             registrarOfficeItem = registrarOffice.objects.filter(id= item['registrarOff']).first()
#             registrarOfficeSerialise = registrarOfficeSerializer(registrarOfficeItem, many= False)
#             item['registrarOffName'] = registrarOfficeSerialise.data

#         if item['bankName'] != '':
#             bankItem = bank.objects.filter(id= item['bankName']).first()
#             bankSerialise = bankSerializer(bankItem, many= False)
#             item['bankName'] = bankSerialise.data
        
#         if item['branchName'] != '':
#             branchItem = branch.objects.filter(id= item['branchName']).first()
#             branchItemSerializer = branchSerializer(branchItem, many= False)
#             item['branchName'] = branchItemSerializer.data
        
#         if item['remarks'] != '':
#             differentRemarksItem = differentRemarks.objects.filter(id= item['remarks']).first()
#             differentRemarksItemSerializer = differentRemarksSerializer(differentRemarksItem, many= False)
#             item['remarksName'] = differentRemarksItemSerializer.data
        
#         if item['handledBy'] != '':
#             handledByItem = handledBy.objects.filter(id= item['handledBy']).first()
#             handledByItemSerializer = handledBySerializer(handledByItem, many= False)
#             item['handledByName'] = handledByItemSerializer.data
        
    
#     return List

# def disbursalBTCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo):
#     if bankName != '':

#         if branchName != '':

#             if pending == 'true':

#                 if registrarOff != '':
#                     ReportData = disbursalBT.objects.filter(
#                         Q(date__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName) & Q(status= pending) & Q(registrarOff= registrarOff)
#                     )
#                 else:
#                     ReportData = disbursalBT.objects.filter(
#                         Q(date__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName) & Q(status= pending)
#                     )

#             else:

#                 if registrarOff != '':
#                     ReportData = disbursalBT.objects.filter(
#                         Q(date__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName) & Q(registrarOff= registrarOff)
#                     )
#                 else:
#                     ReportData = disbursalBT.objects.filter(
#                         Q(date__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(branchName= branchName)
#                     )

#         else:
#             if pending == 'true':
#                 ReportData = disbursalBT.objects.filter(
#                     Q(date__range= [fromDate, fromTo]) & Q(bankName= bankName) & Q(status= 'true')
#                 )
#             else:
#                 ReportData = disbursalBT.objects.filter(
#                     Q(date__range= [fromDate, fromTo]) & Q(bankName= bankName)
#                 )

#     else:
#         if pending == 'true':
#             ReportData = disbursalBT.objects.filter(
#                     Q(date__range= [fromDate, fromTo]) & Q(status= 'true')
#                 )
#         else:
#             ReportData = disbursalBT.objects.filter(
#                     Q(date__range= [fromDate, fromTo])
#                 )
        
#     List = disbursalBTSerializer(ReportData, many= True)
#     for item in List.data:
#         if item['bankName'] != '':
#             bankItem = bank.objects.filter(id= item['bankName']).first()
#             bankSerialise = bankSerializer(bankItem, many= False)
#             item['bankName'] = bankSerialise.data

#         if item['branchName'] != '':
#             branchItem = branch.objects.filter(id= item['branchName']).first()
#             branchItemSerializer = branchSerializer(branchItem, many= False)
#             item['branchName'] = branchItemSerializer.data
        
#         if item['remarks'] != '':
#             differentRemarksItem = differentRemarks.objects.filter(id= item['remarks']).first()
#             differentRemarksItemSerializer = differentRemarksSerializer(differentRemarksItem, many= False)
#             item['remarksName'] = differentRemarksItemSerializer.data
        
#         if item['handledBy'] != '':
#             handledByItem = handledBy.objects.filter(id= item['handledBy']).first()
#             handledByItemSerializer = handledBySerializer(handledByItem, many= False)
#             item['handledByName'] = handledByItemSerializer.data
    
    
#     return List

# @api_view(['POST'])
# def DisbursalRegFullReport(request): 
#     fromDate = request.data.get('from', '')
#     fromTo = request.data.get('to', '')
#     bankName = request.data.get('bank', '')
#     branchName = request.data.get('branch', '')
#     registrarOff = request.data.get('registrarOff', '')

#     pending = request.data.get('pending', 'false')
#     if pending != 'false':
#         pending = 'true'

#     regiLedger = request.data.get('regiLedger', False)
#     loanLedger = request.data.get('loanLedger', False)

#     regiBank = request.data.get('regiBank', False)
#     loanBank = request.data.get('loanBank', False)

#     # added check for above fields TODO
#     if regiLedger == True:
#         List = disbursalRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo)
#     elif loanLedger == True:
#         List = disbursalBTCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo)
#     else:
#         List = disbursalRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo)
        
#     return Response(List.data)


@api_view(['POST'])
def authorityLettersFullReport(request): 
    fromDate = request.data.get('from', '')
    fromTo = request.data.get('to', '')
    bankName = request.data.get('bank', '')
    branchName = request.data.get('branch', '')
    registrarOff = request.data.get('registrarOff', '')

    pending = request.data.get('statusValue', '')

    regiLedger = request.data.get('regiLedger', False)
    loanLedger = request.data.get('loanLedger', False)

    # Assuming regiLedger and loanLedger lead to the same callback, no need for separate checks
    List = authorityLetterRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo)

    return Response(List.data)
    

def get_serialized_data(model, serializer, model_id):
    if model_id:
        item = model.objects.filter(id=model_id).first()
        if item:
            return serializer(item, many=False).data
    return None


def authorityLetterRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo):
    # Creating dictionary filters with condition checks
    common_filters = {
        'bank': bankName if bankName != '' else None,
        'branch': branchName if branchName != '' else None,
        'statusValue': pending if pending != '' else None
    }
    # Removing None entries
    common_filters = {k: v for k, v in common_filters.items() if v is not None}

    date_filter = {f'reciptDate__range': [fromDate, fromTo]}
    filters = {**common_filters, **date_filter}

    ReportData = authorityLetter.objects.filter(**filters)

    report_list = authorityLetterSerializer(ReportData, many=True)
    for item in report_list.data:
        item['bankName'] = get_serialized_data(bank, bankSerializer, item.get('bank', ''))
        item['branchName'] = get_serialized_data(branch, branchSerializer, item.get('branch', ''))
        executiveName = item.get('executiveName', '')
        if is_number(executiveName):
            item['handledByName'] = get_serialized_data(handledBy, handledBySerializer, executiveName)
        else:
            item['handledByName'] = None
    return report_list

@api_view(['POST'])
def depositOfPaymentFullReport(request): 
    fromDate = request.data.get('from', '')
    fromTo = request.data.get('to', '')
    bankName = request.data.get('bank', '')
    branchName = request.data.get('branch', '')
    registrarOff = request.data.get('registrarOff', '')
    pending = request.data.get('statusValue', '')

    # These variables seem to be unused in the current context
    # regiBank = request.data.get('regiBank', False)
    # loanBank = request.data.get('loanBank', False)

    # Simplified logic for regiLedger and loanLedger
    regiLedger = request.data.get('regiLedger', False)
    loanLedger = request.data.get('loanLedger', False)

    # Since all conditions lead to the same function, you don't need separate checks
    List = depositOfPaymentRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo)

    return Response(List.data)


def depositOfPaymentRegCALLBACK(bankName, branchName, pending, registrarOff, fromDate, fromTo):
    # Creating dictionary filters with condition checks
    common_filters = {
        'bank': bankName if bankName != '' else None,
        'branch': branchName if branchName != '' else None,
        'statusValue': pending if pending != '' else None
    }
    # Removing None entries
    common_filters = {k: v for k, v in common_filters.items() if v is not None}

    date_filter = {f'reciptDate__range': [fromDate, fromTo]}
    filters = {**common_filters, **date_filter}

    ReportData = depositOfPayment.objects.filter(**filters)

    report_list = depositOfPaymentSerializer(ReportData, many=True)
    for item in report_list.data:
        item['bankName'] = get_serialized_data(bank, bankSerializer, item.get('bank', ''))
        item['branchName'] = get_serialized_data(branch, branchSerializer, item.get('branch', ''))
        executiveName = item.get('executiveName', '')
        if is_number(executiveName):
            item['handledByName'] = get_serialized_data(handledBy, handledBySerializer, executiveName)
        else:
            item['handledByName'] = None
    return report_list

def is_number(data):
    if data is None:
        return False
    try:
        float(data)
        return True
    except ValueError:
        return False


