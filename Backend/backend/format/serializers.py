from .models import authorityLetter
from .models import depositOfPayment
# initilise 
from rest_framework import serializers

class authorityLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = authorityLetter
        fields = '__all__'

class depositOfPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = depositOfPayment
        fields = '__all__'