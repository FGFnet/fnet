from ..models import LC, Schedule
from ..serializers import (CreateScheduleSerializer, ScheduleSerializer, LCSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime
import dateutil.parser

class LCAPI(APIView):
    def get(self, request):
        if request.user.role != "Admin":
            return Response({"error": True, "data": "Admin role required"})
        error = False
        lc = LC.objects.all().order_by("id")
        return Response({"error": error, "data": LCSerializer(lc, many=True).data})

class ScheduleAPI(APIView):
    def post(self, request):
        print(request.user.role)
        if request.user.role != "Admin":
            return Response({"error": True, "data": "Admin role required"})
        serializer = CreateScheduleSerializer(request.data)
        data = serializer.data

        old = Schedule.objects.filter(day=data["day"])
        old.delete()
        
        schedule = Schedule.objects.create(date=dateutil.parser.parse(data["date"]).date(), day = data["day"])
        return Response({"error":False, "data": ScheduleSerializer(schedule).data})

    def put(self, request):
        data = Schedule.objects.filter()

        if len(data) > 0:
            data.delete()
        # if request.user.role != ADMIN:1
        #     return Response({"error":True, "data":"not Admin"})
        data = request.data["datelist"]
        for d in data:
            serializer = CreateScheduleSerializer(d)
        n = 1
        for d in data:
            Schedule.objects.create(date=dateutil.parser.parse(d["date"]).date(), day = n)
            n+= 1
        return Response({"error":False, "data":None})

            
