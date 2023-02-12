from django.db import models
from django.db.models.fields.related import ForeignKey
from fg.models import FG
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, AutoField, IntegerField, BooleanField


class Todo(models.Model):
    id = models.AutoField(db_column='todo_id' ,primary_key= True)
    created_by = ForeignKey(FG, on_delete=CASCADE, null= True, related_name='created_by' )
    content = CharField(max_length=100)
    common = models.BooleanField() 
    

class Todo_check(models.Model):
    id = models.AutoField(primary_key= True)
    todo_id = ForeignKey(Todo,db_column='todo_id' ,on_delete=CASCADE, null= True, related_name='todo_id' )
    fg_id = ForeignKey(FG, on_delete=CASCADE, null= True, related_name='fg_id' )
    check = models.BooleanField()
