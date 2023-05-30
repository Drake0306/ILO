from django.db import models

# Create your models here.
class registrarOffice (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class handledBy (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    phoneNo                 = models.CharField(max_length=250, null=True, blank=True)
    aadharNo                = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class delTable (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class differentRemarks (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class bank (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    branch                  = models.CharField(max_length=250, null=True, blank=True)
    contactPerson           = models.CharField(max_length=250, null=True, blank=True)
    address                 = models.CharField(max_length=250, null=True, blank=True)
    std                     = models.CharField(max_length=250, null=True, blank=True)
    phoneOne                = models.CharField(max_length=250, null=True, blank=True)
    phonetwo                = models.CharField(max_length=250, null=True, blank=True)
    fax                     = models.CharField(max_length=250, null=True, blank=True)
    email                   = models.CharField(max_length=250, null=True, blank=True)
    website                 = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class branch (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    bankName                    = models.CharField(max_length=250, null=True, blank=True)
    path                    = models.CharField(max_length=250, null=True, blank=True)
    address                 = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class DSA (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    phone                   = models.CharField(max_length=250, null=True, blank=True)
    delValue                = models.CharField(max_length=250, null=True, blank=True)
    address                 = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')

class fee (models.Model):
    name                    = models.CharField(max_length=250, null=True, blank=True)
    particulars             = models.CharField(max_length=250, null=True, blank=True)
    FeeinRs                 = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')




    


    