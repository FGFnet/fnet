from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, BooleanField
from django.db.models.fields.related import ForeignKey
from lc.models import LC

# Create your models here.
class Freshman(models.Model):
    NATURAL_SCIENCE = 'NC'
    ENGINEERING = 'EN'
    SOCIAL_SCIENCE = 'SS'
    HUMANITIES_SCIENCE = 'HS'

    DEPARTMENT_CHOICES = [
        (NATURAL_SCIENCE, '자연과학계열'),
        (ENGINEERING, '공학계열'),
        (SOCIAL_SCIENCE, '사회과학계열'),
        (HUMANITIES_SCIENCE, '인문과학계열'),
    ]

    lc = ForeignKey(LC, on_delete=CASCADE, null=True)
    name = CharField(max_length=30)
    phone_number = CharField(max_length=13, null=True)
    register = BooleanField(default=False)
    department = CharField(max_length=10, choices=DEPARTMENT_CHOICES) # n(자연과학),e(공학),s(사회과학),h(인문사회) 

    def __str__(self):
        return self.name