from .models import registrarOffice
from .models import handledBy
from .models import delTable
from .models import differentRemarks
from .models import bank
from .models import branch
from .models import DSA
from .models import fee
# initilise 
from rest_framework import serializers

class registrarOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = registrarOffice
        fields = '__all__'

class handledBySerializer(serializers.ModelSerializer):
    class Meta:
        model = handledBy
        fields = '__all__'

class delTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = delTable
        fields = '__all__'

class differentRemarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = differentRemarks
        fields = '__all__'

class bankSerializer(serializers.ModelSerializer):
    class Meta:
        model = bank
        fields = '__all__'

class branchSerializer(serializers.ModelSerializer):
    class Meta:
        model = branch
        fields = '__all__'

class DSASerializer(serializers.ModelSerializer):
    class Meta:
        model = DSA
        fields = '__all__'

class feeSerializer(serializers.ModelSerializer):
    class Meta:
        model = fee
        fields = '__all__'