from django.db import models
from .models import Schedule, LC
from rest_framework import serializers
from fg.serializers import FGSerializer

class CreateScheduleSerializer(serializers.Serializer):
    date = serializers.DateField()
    day = serializers.IntegerField()

class LCSerializer(serializers.ModelSerializer):
    fg_n_id = FGSerializer()
    fg_s_id = FGSerializer()
    class Meta:
        model = LC
        fields = "__all__"


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"
        