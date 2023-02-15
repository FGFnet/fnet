from django.urls import path
from ..views.user import TodayLCAPI, LCAPI, ScheduleAPI

urlpatterns = [
    path('schedule/', ScheduleAPI.as_view(), name="schedule_api"),
    path('LC/', LCAPI.as_view(), name="LC_api"),
    path('TodayLC/', TodayLCAPI.as_view(), name="TodayLC_api")
]