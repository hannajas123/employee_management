from rest_framework import routers
from .views import DynamicFormViewSet, EmployeeViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'forms', DynamicFormViewSet, basename='forms')
router.register(r'employees', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('', include(router.urls)),
]
