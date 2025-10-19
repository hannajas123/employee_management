"""
URL configuration for employee_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.shortcuts import render
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from employees.views import form_builder_view, employee_list_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('employees.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Frontend routes
    path('login/', lambda r: render(r, 'login.html'), name='login'),
    path('register/', lambda r: render(r, 'register.html'), name='register'),
    path('profile/', lambda r: render(r, 'profile.html'), name='profile'),
    path('change-password/', lambda r: render(r, 'change_password.html'), name='change_password'),

    path('form-builder/', form_builder_view, name='form_builder'),
    path('employees/', employee_list_view, name='employee_list'),
]
