from django.db import models
from restt_framework import serializers

class CreateScheduleSerializer(serializers.Serializer):
    date = serializers.dateField()