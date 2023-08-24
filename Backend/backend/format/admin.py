from django.contrib import admin

from .models import authorityLetter
from .models import depositOfPayment


# Register your models here.
admin.site.register(authorityLetter)
admin.site.register(depositOfPayment)


