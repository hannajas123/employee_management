from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email',''),
            first_name=validated_data.get('first_name',''),
            last_name=validated_data.get('last_name','')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name']

# class ProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     class Meta:
#         model = Profile
#         fields = ['user','phone','bio']
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # remove read_only

    class Meta:
        model = Profile
        fields = ['user', 'phone', 'bio']

    def update(self, instance, validated_data):
        # Profile fields
        instance.phone = validated_data.get('phone', instance.phone)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()

        # Nested user
        user_data = validated_data.get('user', {})
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()

        return instance

    
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField(min_length=6)
