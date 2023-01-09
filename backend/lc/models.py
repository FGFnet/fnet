from django.db import models
from django.db.models.fields.related import ForeignKey
from FG.models import FG

# Create your models here.
class LC(models.Model):
    id = models.AutoField(primary_key= True)
    fg_n_id = ForeignKey(FG, on_delete=CASCADE, null= True, related_name='fg_n' )
    fg_s_id = ForeignKey(FG, on_delete=CASCADE, null= True, related_name='fg_s' )
    schedule = IntegerField()
    name = CharField(max_length=10)
    total = IntegerField()

class Schedule(models.Model):
    date = DataField(default=datatime.now)
    day = IntegerField()