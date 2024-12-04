from rest_framework import generics
from rest_framework.filters import SearchFilter
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceListCreateView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    filter_backends = (SearchFilter,)  # Enable search filter
    search_fields = ['invoice_number', 'customer_name', 'date']

class InvoiceRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
