from ..models import LC, Schedule
from ..serializers import (CreateScheduleSerializer, ScheduleSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime
import dateutil.parser

class ScheduleAPI(APIView):
    def get(self, request):
        try: 
            queryset = Schedule.objects.all()
            data = ScheduleSerializer(queryset, many = True).data
        except Schedule.DoesNotExist:
            return Response({"error": True, "data": "NO data"})
        return Response({"error":False, "data":data})

class TodayLCAPI(APIView):
    def get(self, request):
        user_campus = request.user.campus
        current_datetime = datetime.date.today()
        try:
            schedule = Schedule.objects.get(date = current_datetime)
        except Schedule.DoesNotExist:
            return Response({"error":False, "data": None})
        if user_campus == "n":
            try:
                todayLC = LC.objects.get(day = schedule["day"], fg_n_id = request.user.id)
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        else:
            try:
                todayLC = LC.objects.get(day = schedule["day"], fg_s_id = request.user.id)
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        return Response({"error": False, "data": todayLC})

class LCAPI(APIView):
    def get(self, request):
        user_campus = request.user.campus
        if user_campus == "n":
            try:
                todayLC = LC.objects.get(fg_n_id = request.user.id)
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        else:
            try:
                todayLC = LC.objects.get(fg_s_id = request.user.id)
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        return Response({"error": False, "data": todayLC})
