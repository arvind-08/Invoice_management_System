from django.urls import path
from .views import InvoiceListCreateView, InvoiceRetrieveUpdateDeleteView

urlpatterns = [
    path('api/invoices/', InvoiceListCreateView.as_view(), name='invoice-list-create'),
    path('api/invoices/<int:pk>/', InvoiceRetrieveUpdateDeleteView.as_view(), name='invoice-detail'),
]
