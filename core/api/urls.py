from django.contrib import admin
from django.urls import path,include
from .views import checkDamageAPI,checkInventoryAPI,generateReportsAPI,rateCustomerAPI

urlpatterns = [
    path('damagecheck/', checkDamageAPI.as_view(), name='check-damage'),
    path('checkinv/',checkInventoryAPI.as_view(),name="check-inventory"),
    path('generatereport/',generateReportsAPI.as_view(), name='generate-report'),
    path('ratestaff/',rateCustomerAPI.as_view(),name='rate-customer')
]
