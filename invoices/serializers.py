# from rest_framework import serializers
# from .models import Invoice, InvoiceDetail

# class InvoiceDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = InvoiceDetail
#         fields = ['id', 'description', 'quantity', 'unit_price', 'line_total']

# class InvoiceSerializer(serializers.ModelSerializer):
#     details = InvoiceDetailSerializer(many=True)

#     class Meta:
#         model = Invoice
#         fields = ['id', 'invoice_number', 'customer_name', 'date', 'details']

#     def create(self, validated_data):
#         details_data = validated_data.pop('details')
#         invoice = Invoice.objects.create(**validated_data)
#         for detail_data in details_data:
#             InvoiceDetail.objects.create(invoice=invoice, **detail_data)
#         return invoice

#     def update(self, instance, validated_data):
#         details_data = validated_data.pop('details')
#         instance.invoice_number = validated_data.get('invoice_number', instance.invoice_number)
#         instance.customer_name = validated_data.get('customer_name', instance.customer_name)
#         instance.date = validated_data.get('date', instance.date)
#         instance.save()

#         # Update details
#         instance.details.all().delete()  # Remove old details
#         for detail_data in details_data:
#             InvoiceDetail.objects.create(invoice=instance, **detail_data)
#         return instance

from rest_framework import serializers
from .models import Invoice, InvoiceDetail
from rest_framework.exceptions import ValidationError

class InvoiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceDetail
        fields = ['id', 'description', 'quantity', 'unit_price', 'line_total']

class InvoiceSerializer(serializers.ModelSerializer):
    details = InvoiceDetailSerializer(many=True)

    class Meta:
        model = Invoice
        fields = ['id', 'invoice_number', 'customer_name', 'date', 'details']

    def validate_invoice_number(self, value):
        # Check if invoice_number already exists in the database
        if Invoice.objects.filter(invoice_number=value).exists():
            raise ValidationError("Invoice number must be unique.")
        return value

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        invoice = Invoice.objects.create(**validated_data)
        for detail_data in details_data:
            InvoiceDetail.objects.create(invoice=invoice, **detail_data)
        return invoice

    def update(self, instance, validated_data):
        details_data = validated_data.pop('details')
        instance.invoice_number = validated_data.get('invoice_number', instance.invoice_number)
        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.date = validated_data.get('date', instance.date)
        instance.save()

        # Update details
        instance.details.all().delete()  # Remove old details
        for detail_data in details_data:
            InvoiceDetail.objects.create(invoice=instance, **detail_data)
        return instance
