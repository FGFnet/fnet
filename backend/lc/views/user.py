from ..models import LC, Schedule
from ..serializers import (CreateScheduleSerializer, ScheduleSerializer, LCSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime
import dateutil.parser

class ScheduleAPI(APIView):
    def get(self, request):
        try: 
            queryset = Schedule.objects.all().order_by("day")
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
                todayLC = LC.objects.filter(schedule = schedule.day, fg_n_id = request.user)
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        else:
            try:
                todayLC = LC.objects.filter(schedule = schedule.day, fg_s_id = request.user)
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        return Response({"error": False, "data": LCSerializer(todayLC, many=True).data})

class LCAPI(APIView):
    def get(self, request):
        user_campus = request.user.campus
        
        if user_campus == "n":
            try:
                todayLC = LC.objects.filter(fg_n_id = request.user)
                data = LCSerializer(todayLC, many=True).data
                
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        else:
            try:
                todayLC = LC.objects.filter(fg_s_id = request.user)
                data = LCSerializer(todayLC, many=True).data
            except LC.DoesNotExist:
                return Response({"error":False, "data": None})
        return Response({"error": False, "data": data})
