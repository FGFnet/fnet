from ..models import LC, Schedule
from ..serializers import (FGSerializer, CreateScheduleSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

class ScheduleAPI(APIView):
    def get(self, request):
        if request.user.role != ADMIN:
            return Response({"error":True, "data":"not Admin"})
        schedule = Schedule.objects.get()
        return Response({"error":False, "data":schedule})

    def put(self, request):
        data = Schedule.objects.get()
        data.delete()
        if request.user.role != ADMIN:
            return Response({"error":True, "data":"not Admin"})
        data = request.data
        for d in data:
            serializer = CreateScheduleSerializer(d)
            serializer.is_valid(raise_exception=True)
        data.sort()
        n = 1
        for d in data:
            schedule = Schedule.objects.create(date=d, day = n)
            n+= 1
        return Response({"error":False, "data":None})

            
