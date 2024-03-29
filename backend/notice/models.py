from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import BooleanField, CharField, DateTimeField, TextField
from django.db.models.fields.related import ForeignKey
from fg.models import FG

# Create your models here.
class Notice(models.Model):
    created_by = ForeignKey(FG, on_delete=CASCADE)
    title = CharField(max_length = 100)
    content = CharField(max_length = 500)
    create_time = DateTimeField(auto_now_add = True, blank = True)

    class Meta:
        db_table = 'notice'
        ordering = ['-create_time']


class Comment(models.Model):
    notice = ForeignKey(Notice, on_delete=CASCADE)
    created_by = ForeignKey(FG, on_delete=CASCADE)
    content = CharField(max_length = 500)
    create_time = DateTimeField(auto_now_add = True, blank = True)
    check = BooleanField(default = False)

    class Meta:
        db_table = 'comment'
        ordering = ['-create_time']