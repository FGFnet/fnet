from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, DateField, IntegerField
from django.db.models.fields.related import ForeignKey
from fg.models import FG

# Create your models here.
class Schedule(models.Model):
    date = DateField()
    day = IntegerField()

    def __str__(self):
        return f'{self.date}'

class LC(models.Model):
    id = models.AutoField(primary_key=True)
    fg_n_id = ForeignKey(FG, on_delete=CASCADE, null=True, related_name='fg_n')
    fg_s_id = ForeignKey(FG, on_delete=CASCADE, null=True, related_name='fg_s')
    schedule = IntegerField()
    name = CharField(max_length=10)
    total = IntegerField()
    
    class Meta:
        db_table = 'lc'
        ordering = ['schedule', 'name']
    
    def __str__(self):
        return self.name