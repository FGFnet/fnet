from django.db import models
from .models import Todo
from rest_framework import serializers

class CreateTodoSerializer(serializers.Serializer):
    content = serializers.CharField()
    common = serializers.BooleanField()
