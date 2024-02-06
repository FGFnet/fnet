from django.contrib import admin
from .models import LC, Schedule

# Register your models here.
admin.site.register(Schedule)
admin.site.register(LC)