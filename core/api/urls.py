from django.contrib import admin
from django.urls import path,include
from .views import checkDamageAPI

urlpatterns = [
    path('damagecheck/', checkDamageAPI.as_view(), name='check-damage'),
]
