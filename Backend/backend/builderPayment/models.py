from django.db import models

# Create your models here.
class builderPayment(models.Model):
    reciptDate              = models.DateField(null=True, blank=True)
    fileNo                  = models.CharField(max_length=250,blank=False,null=False)
    bank                    = models.CharField(max_length=250,blank=True, null=True)
    branch                  = models.CharField(max_length=250,blank=True, null=True)
    uid                     = models.CharField(max_length=250,blank=True, null=True)
    loanACNo                = models.CharField(max_length=250,blank=False,null=False)
    collectedBy             = models.CharField(max_length=250,blank=True, null=True)
    handledByName           = models.CharField(max_length=250,blank=True, null=True)
    refNo                   = models.CharField(max_length=250,blank=False,null=False)
    customerBorrower        = models.CharField(max_length=250,blank=False,null=False)
    address                 = models.TextField(blank=False,null=False)
    payOrderNo              = models.CharField(max_length=250,blank=False,null=False)
    dated                   = models.DateField(null=True, blank=True)
    forRs                   = models.CharField(max_length=250,blank=False,null=False)
    favoring                = models.TextField(blank=False,null=False)
    reciptNo                = models.CharField(max_length=250,blank=False,null=False)
    amount                  = models.FloatField(blank=False, null=False,default=0.00)
    recDate                 = models.DateField(null=True, blank=True)
    remarks                 = models.TextField(blank=False,null=False)
    status                  = models.CharField(max_length=250, default='true')




    


    