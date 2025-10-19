from rest_framework import serializers
from .models import DynamicForm, FormField, Employee

class FormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormField
        fields = ['id','label','field_type','order','required']

class DynamicFormSerializer(serializers.ModelSerializer):
    fields = FormFieldSerializer(many=True)

    class Meta:
        model = DynamicForm
        fields = ['id','name','created_by','created_at','fields']
        read_only_fields = ('created_by','created_at')

    def create(self, validated_data):
        fields_data = validated_data.pop('fields', [])
        request = self.context.get('request')
        form = DynamicForm.objects.create(created_by=request.user, **validated_data)
        for f in fields_data:
            FormField.objects.create(form=form, **f)
        return form

    def update(self, instance, validated_data):
        fields_data = validated_data.pop('fields', None)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        if fields_data is not None:
            # simple approach: delete and recreate fields
            instance.fields.all().delete()
            for f in fields_data:
                FormField.objects.create(form=instance, **f)
        return instance


from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    # Add a read-only field to show form name
    form_name = serializers.CharField(source='form.name', read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'form', 'form_name', 'data', 'created_by', 'created_at']
        read_only_fields = ('created_by', 'created_at')

    def validate(self, attrs):
        form = attrs.get('form')
        data = attrs.get('data') or {}
        if form:
            labels = [f.label for f in form.fields.all()]
            missing = [l for l in labels if l not in data and form.fields.filter(label=l, required=True).exists()]
            if missing:
                raise serializers.ValidationError({"data": f"Missing required fields: {missing}"})
        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['created_by'] = request.user
        return super().create(validated_data)
