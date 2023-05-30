from django.contrib import admin

from .models import registrarOffice
from .models import handledBy
from .models import delTable
from .models import differentRemarks
from .models import bank
from .models import DSA
from .models import fee
from .models import branch


# Register your models here.
admin.site.register(registrarOffice)
admin.site.register(delTable)
admin.site.register(handledBy)
admin.site.register(differentRemarks)
admin.site.register(bank)
admin.site.register(DSA)
admin.site.register(fee)
admin.site.register(branch)


