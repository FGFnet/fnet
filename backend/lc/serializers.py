from django.db import models
from rest_framework import serializers

class CreateScheduleSerializer(serializers.Serializer):
    date = serializers.DateField()