from django.db import models
from django.contrib.auth.models import User

class DynamicForm(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class FormField(models.Model):
    FIELD_TYPES = [
        ('text', 'Text'),
        ('number', 'Number'),
        ('date', 'Date'),
        ('password', 'Password'),
        ('email', 'Email'),
        ('textarea', 'Textarea'),
    ]
    form = models.ForeignKey(DynamicForm, related_name='fields', on_delete=models.CASCADE)
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    order = models.IntegerField(default=0)
    required = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.form.name} - {self.label}"

class Employee(models.Model):
    form = models.ForeignKey(DynamicForm, on_delete=models.PROTECT)
    data = models.JSONField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Employee #{self.pk} ({self.form.name})"
