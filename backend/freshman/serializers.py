from django.db import models
from rest_framework import serializers
from .models import Freshman

class FreshmanSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    lc = serializers.SerializerMethodField()
    register = serializers.BooleanField()
    # register = serializers.SerializerMethodField()
    class Meta:
        model = Freshman
        fields = ['id', 'name','phone_number', 'lc', 'register']

    def get_name(self, obj):
        return obj.name

    def get_phone_number(self, obj):
        return obj.phone_number[4:8]

    def get_lc(self, obj):
        return obj.lc.name
    
    # def get_register(self, obj):
    #     if obj.register:
    #         return 'O'
    #     else:
    #         return 'X'


class FreshmanLCSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    lc = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    register = serializers.SerializerMethodField()

    class Meta:
        model = Freshman
        fields = ['name', 'department', 'lc', 'register']

    def get_name(self, obj):
        return obj.name

    def get_lc(self, obj):
        return obj.lc.name

    def get_department(self, obj):
        if obj.department == "EN":
            return "공학"
        elif obj.department == "NC":
            return "자연과학"
        elif obj.department == "HS":
            return "인문사회"
        elif obj.department == "SS":
            return "사회과학"        
    
    def get_register(self, obj):
        if obj.register:
            return 'O'
        else:
            return 'X'

class registerFreshmanSerializer(serializers.Serializer):
    freshman_id = serializers.IntegerField()

class FreshmanFileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()