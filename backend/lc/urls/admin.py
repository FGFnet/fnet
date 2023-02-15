from django.urls import path
from ..views.admin import ScheduleAPI, LCAPI

urlpatterns = [
    path('schedule/', ScheduleAPI.as_view(), name="schedule_api"),
    path('LC/', LCAPI.as_view(), name="lc_api")
]