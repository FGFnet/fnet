from django.db import models
from django.db.models.fields.related import ForeignKey
from fg.models import FG
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, AutoField, IntegerField, DateField
from datetime import datetime

# Create your models here.
class LC(models.Model):
    id = models.AutoField(primary_key= True)
    fg_n_id = ForeignKey(FG, on_delete=CASCADE, null= True, related_name='fg_n' )
    fg_s_id = ForeignKey(FG, on_delete=CASCADE, null= True, related_name='fg_s' )
    schedule = IntegerField()
    name = CharField(max_length=10)
    total = IntegerField()

class Schedule(models.Model):
    date = DateField(default=datetime.now)
    day = IntegerField()