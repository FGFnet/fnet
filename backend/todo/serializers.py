from django.db import models
from .models import Todo, Todo_check
from rest_framework import serializers

class CreateTodoSerializer(serializers.Serializer):
    content = serializers.CharField()
    common = serializers.BooleanField()

class EditTodoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    content = serializers.CharField()

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"

class TodoCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo_check
        fields = "__all__"

class TodoCheckSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    check = serializers.BooleanField()

class TodoAllSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    todo_id = serializers.IntegerField()
    content = serializers.CharField()
    common = serializers.BooleanField()
    check = serializers.BooleanField()
