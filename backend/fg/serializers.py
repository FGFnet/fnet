from django.db import models
from rest_framework import serializers
from .models import FG

class FGSerializer(serializers.ModelSerializer):
    class Meta:
        model = FG
        fields = ['id', 'name', 'role', 'student_id', 'campus']

class CreateFGSerializer(serializers.Serializer):
    name = serializers.CharField()
    student_id = serializers.CharField()
    role = serializers.CharField()
    campus = serializers.CharField()

class LoginSerializer(serializers.Serializer):
    name = serializers.CharField()
    password = serializers.CharField()

class FGFileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()