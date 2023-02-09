from django.db import models
from .models import Schedule, LC
from rest_framework import serializers

class CreateScheduleSerializer(serializers.Serializer):
    date = serializers.DateField()

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"
        