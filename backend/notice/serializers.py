from django.db import models
from rest_framework import serializers
from .models import Notice, Comment

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = "__all__"

class CreateNoticeSerializer(serializers.Serializer):
    title = serializers.CharField()
    content = serializers.CharField()

class EditNoticeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    content = serializers.CharField()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class CreateCommentSerializer(serializers.Serializer):
    notice_id = serializers.IntegerField()
    content = serializers.CharField()

class EditCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    content = serializers.CharField()

class CheckCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    check = serializers.BooleanField()