from .models import builderPayment
# initilise 
from rest_framework import serializers

class builderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = builderPayment
        fields = '__all__'