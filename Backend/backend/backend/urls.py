"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from globalMaster import views as masterView
from builderPayment import views as builderPaymentView

urlpatterns = [
    path('admin/', admin.site.urls),

    # BuilderPayment
    path('api/builderPayment/list', builderPaymentView.List, name="builder payment List"),
    path('api/builderPayment/create', builderPaymentView.Create, name="builder payment Create"),
    path('api/builderPayment/update/<int:id>', builderPaymentView.Update, name="builder payment Update"),

    ### Master ###
    #registrarOffice
    path('api/master/registrarOffice/list', masterView.registrarOfficeList, name="Master List"),
    path('api/master/registrarOffice/create', masterView.registrarOfficeCreate, name="Master Create"),
    path('api/master/registrarOffice/update/<int:id>', masterView.registrarOfficeUpdate, name="Master Update"),
]
"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from globalMaster import views as masterView
from builderPayment import views as builderPaymentView
from option import views as optionView
from disbursal import views as disbursalView
from authUser import views as auth

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth
    path('api/auth/login', auth.authCheckLogin, name="Login"),
    path('api/auth/userList', auth.authUserList, name="user list"),

    # BuilderPayment
    path('api/builderPayment/list', builderPaymentView.List, name="builder payment List"),
    path('api/builderPayment/create', builderPaymentView.Create, name="builder payment Create"),
    path('api/builderPayment/update/<int:id>', builderPaymentView.Update, name="builder payment Update"),
    path('api/builderPayment/delete/<int:id>', builderPaymentView.Delete, name="builder payment Delete"),
    path('api/builderPayment/paymentLedgerReport', builderPaymentView.paymentLedgerReport, name="builder payment Report"),
    path('api/builderPayment/paymentExecutiveReport', builderPaymentView.paymentExecutiveReport, name="builder payment Executive Report"),
    
    # Option
    path('api/option/list', optionView.List, name="option List"),
    path('api/option/create', optionView.Create, name="option Create"),
    path('api/option/update/<int:id>', optionView.Update, name="option Update"),
    path('api/option/delete/<int:id>', optionView.Delete, name="option Delete"),
    path('api/option/bankWiseReport', optionView.BankWiseReport, name="option BankWiseReport"),
    path('api/option/statusWiseReport', optionView.StatusWiseReport, name="option statusWiseReport"),
    path('api/option/executiveWiseReport', optionView.ExecutiveWiseReport, name="option ExecutiveWiseReport"),
    path('api/option/typeWiseReport', optionView.TypeWiseReport, name="option TypeWiseReport"),

    path('api/option/dudupe/', optionView.dudupeReport, name="option Report"),

    
    # disbursal
    path('api/disbursal/registration/list', disbursalView.disbursalRegistrationList, name="disbursal List"),
    path('api/disbursal/registration/create', disbursalView.disbursalRegistrationCreate, name="disbursal Create"),
    path('api/disbursal/registration/update/<int:id>', disbursalView.disbursalRegistrationUpdate, name="disbursal Update"),
    path('api/disbursal/registration/delete/<int:id>', disbursalView.disbursalRegistrationDelete, name="disbursal Delete"),

    path('api/disbursal/BT/list', disbursalView.disbursalBTList, name="disbursal List"),
    path('api/disbursal/BT/create', disbursalView.disbursalBTCreate, name="disbursal Create"),
    path('api/disbursal/BT/update/<int:id>', disbursalView.disbursalBTUpdate, name="disbursal Update"),
    path('api/disbursal/BT/delete/<int:id>', disbursalView.disbursalBTDelete, name="disbursal Delete"),
    
    path('api/disbursal/registrationBTGlobalREport', disbursalView.DisbursalRegFullReport, name="disbursal DisbursalRegFullReport"),

    ### Master ###
    #registrarOffice
    path('api/master/registrarOffice/list', masterView.registrarOfficeList, name="Master List"),
    path('api/master/registrarOffice/create', masterView.registrarOfficeCreate, name="Master Create"),
    path('api/master/registrarOffice/update/<int:id>', masterView.registrarOfficeUpdate, name="Master Update"),
    path('api/master/registrarOffice/delete/<int:id>', masterView.registrarOfficeDelete, name="Master Delete"),
    #handledBy
    path('api/master/handledBy/list', masterView.handledByList, name="Master List"),
    path('api/master/handledBy/create', masterView.handledByCreate, name="Master Create"),
    path('api/master/handledBy/update/<int:id>', masterView.handledByUpdate, name="Master Update"),
    path('api/master/handledBy/delete/<int:id>', masterView.handledByDelete, name="Master Delete"),
    #delTable
    path('api/master/delTable/list', masterView.delTableList, name="Master List"),
    path('api/master/delTable/create', masterView.delTableCreate, name="Master Create"),
    path('api/master/delTable/update/<int:id>', masterView.delTableUpdate, name="Master Update"),
    path('api/master/delTable/delete/<int:id>', masterView.delTableDelete, name="Master Delete"),
    #differentRemarks
    path('api/master/differentRemarks/list', masterView.differentRemarksList, name="Master List"),
    path('api/master/differentRemarks/create', masterView.differentRemarksCreate, name="Master Create"),
    path('api/master/differentRemarks/update/<int:id>', masterView.differentRemarksUpdate, name="Master Update"),
    path('api/master/differentRemarks/delete/<int:id>', masterView.differentRemarksDelete, name="Master Delete"),
    #bank
    path('api/master/bank/list', masterView.bankList, name="Master List"),
    path('api/master/bank/create', masterView.bankCreate, name="Master Create"),
    path('api/master/bank/update/<int:id>', masterView.bankUpdate, name="Master Update"),
    path('api/master/bank/delete/<int:id>', masterView.bankDelete, name="Master Delete"),
    #branch
    path('api/master/branch/list', masterView.branchList, name="Master List"),
    path('api/master/branch/create', masterView.branchCreate, name="Master Create"),
    path('api/master/branch/update/<int:id>', masterView.branchUpdate, name="Master Update"),
    path('api/master/branch/delete/<int:id>', masterView.branchDelete, name="Master Delete"),
    #DSA
    path('api/master/DSA/list', masterView.DSAList, name="Master List"),
    path('api/master/DSA/create', masterView.DSACreate, name="Master Create"),
    path('api/master/DSA/update/<int:id>', masterView.DSAUpdate, name="Master Update"),
    path('api/master/DSA/delete/<int:id>', masterView.DSADelete, name="Master Delete"),
    #feeMaster
    path('api/master/fee/list', masterView.feeList, name="Master List"),
    path('api/master/fee/create', masterView.feeCreate, name="Master Create"),
    path('api/master/fee/update/<int:id>', masterView.feeUpdate, name="Master Update"),
    path('api/master/fee/delete/<int:id>', masterView.feeDelete, name="Master Delete"),
]
