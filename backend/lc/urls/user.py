from django.urls import path
from ..views.admin import ScheduleAPI

urlpatterns = [
    path('schedule/', ScheduleAPI.as_view(), name="schedule_api"),
]