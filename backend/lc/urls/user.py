from django.urls import path
from ..views.admin import ScheduleAPI
from ..views.user import TodayLCAPI, LCAPI

urlpatterns = [
    path('schedule/', ScheduleAPI.as_view(), name="schedule_api"),
    path('LC/', LCAPI.as_view(), name="LC_api"),
    path('ToayLC/', TodayLCAPI.as_view(), name="TodayLC_api")
]