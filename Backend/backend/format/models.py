from django.db import models

# Create your models here.
class authorityLetter(models.Model):
    reciptDate              = models.CharField(max_length=250,blank=True,null=True)
    refNo            = models.CharField(max_length=250,blank=True,null=True)
    bank                   = models.CharField(max_length=250,blank=True,null=True)
    branch      = models.CharField(max_length=250,blank=True, null=True)
    customerBorrower               = models.CharField(max_length=250,blank=True, null=True)
    phoneNo               = models.CharField(max_length=250,blank=True,null=True)
    address                   = models.CharField(max_length=250,blank=True, null=True)
    builderName                 = models.CharField(max_length=250,blank=True, null=True)
    documents                = models.CharField(max_length=250,blank=True,null=True)
    documentsCollected          = models.CharField(max_length=250,blank=True,null=True)
    dateDocCollect             = models.CharField(max_length=250,blank=True,null=True)
    documentSentOn              = models.CharField(max_length=250,blank=True,null=True)
    CaseClosed              = models.CharField(max_length=250,blank=True,null=True)
    AckReceived              = models.CharField(max_length=250,blank=True,null=True)
    AckFiled              = models.CharField(max_length=250,blank=True,null=True)
    volNo                = models.CharField(max_length=250,blank=True,null=True)
    sn            = models.CharField(max_length=250,blank=True,null=True)
    remarks           = models.CharField(max_length=250,blank=True,null=True)    
    statusValue           = models.CharField(max_length=250,blank=True,null=True)    
    status                = models.CharField(max_length=250, default='true')

class depositOfPayment(models.Model):
    reciptDate              = models.CharField(max_length=250,blank=True,null=True)
    refNo            = models.CharField(max_length=250,blank=True,null=True)
    bank                   = models.CharField(max_length=250,blank=True,null=True)
    branch      = models.CharField(max_length=250,blank=True, null=True)
    customerBorrower               = models.CharField(max_length=250,blank=True, null=True)
    paymentDetails               = models.CharField(max_length=250,blank=True,null=True)
    address                   = models.CharField(max_length=250,blank=True, null=True)
    builderName               = models.CharField(max_length=250,blank=True,null=True)
    DateofDeposit                 = models.CharField(max_length=250,blank=True, null=True)
    Receiptparticulars                = models.CharField(max_length=250,blank=True,null=True)
    dateReceiptSentToBank          = models.CharField(max_length=250,blank=True,null=True)
    CaseClosed             = models.CharField(max_length=250,blank=True,null=True)
    AckReceived              = models.CharField(max_length=250,blank=True,null=True)
    AckFiled              = models.CharField(max_length=250,blank=True,null=True)
    volNo                = models.CharField(max_length=250,blank=True,null=True)
    sn            = models.CharField(max_length=250,blank=True,null=True)
    remarks           = models.CharField(max_length=250,blank=True,null=True)    
    statusValue           = models.CharField(max_length=250,blank=True,null=True)    
    status                = models.CharField(max_length=250, default='true')




    


    