from rest_framework import viewsets, permissions
from .models import DynamicForm, Employee
from .serializers import DynamicFormSerializer, EmployeeSerializer

class DynamicFormViewSet(viewsets.ModelViewSet):
    serializer_class = DynamicFormSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # users see only their forms
        return DynamicForm.objects.filter(created_by=self.request.user)

class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Employee.objects.filter(created_by=self.request.user)
        # optional dynamic field filter via ?field=<label>&value=<term>
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')
        if field and value:
            lookup = {f"data__{field}__icontains": value}
            qs = qs.filter(**lookup)
        return qs
from django.shortcuts import render

def form_builder_view(request):
    return render(request, 'form_builder.html')

def employee_list_view(request):
    return render(request, 'employee_list.html')
