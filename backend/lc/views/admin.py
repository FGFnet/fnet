from ..models import LC, Schedule
from ..serializers import (CreateScheduleSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime
import dateutil.parser

class ScheduleAPI(APIView):
    def get(self, request):
        # if request.user.role != ADMIN:
        #     return Response({"error":True, "data":"not Admin"})
        schedule = Schedule.objects.get()
        return Response({"error":False, "data":schedule})

    def post(self, request):
        data = request.data
        serializer = CreateScheduleSerializer(data)
        Schedule.objects.create(date=dateutil.parser.parse(data["date"]).date(), day = 1)
        return Response({"error":False, "data":None})


    def put(self, request):
        data = Schedule.objects.get()

        if len(data) > 0:
            data.delete()
        if request.user.role != ADMIN:
            return Response({"error":True, "data":"not Admin"})
        data = request.data.data
        for d in data:
            serializer = CreateScheduleSerializer(d)
            serializer.is_valid(raise_exception=True)
        data.sort()
        n = 1
        for d in data:
            schedule = Schedule.objects.create(date=d, day = n)
            n+= 1
        return Response({"error":False, "data":None})

            
