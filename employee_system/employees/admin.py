from django.contrib import admin
from .models import DynamicForm, FormField, Employee



class FormFieldInline(admin.TabularInline):
    model = FormField
    extra = 0

@admin.register(DynamicForm)
class DynamicFormAdmin(admin.ModelAdmin):
    inlines = [FormFieldInline]

admin.site.register(Employee)
