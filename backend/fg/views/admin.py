from ..models import FG
from ..serializers import (FGSerializer, CreateFGSerializer, FGFileUploadSerializer)
from lc.serializers import LCSerializer
from lc.models import LC

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from openpyxl import load_workbook
from django.db import transaction, IntegrityError
from rest_framework.exceptions import ParseError
from django.contrib.auth.hashers import make_password

class FGAPI(APIView):
    def get(self, request):
        if request.user.role != 'Admin':
            return Response({"error": True, "data": "Admin role required"})
        fg_id = request.GET.get("id")
        error = False
        if fg_id:
            try:
                queryset = FG.objects.get(id=fg_id)
                data = FGSerializer(queryset).data
            except FG.DoesNotExist:
                data = "FG does not exist"
                error = True
        else:
            queryset = FG.objects.all().order_by("name")
            data = FGSerializer(queryset, many=True).data
        return Response({"error": error, "data": data})

    def delete(self, request):
        if not request.user.is_admin:
            return Response({"error": True, "data": "Admin role required"})
        fg_id = request.GET.get("id")
        if fg_id:
            FG.objects.filter(id=fg_id).delete()
        else:
            FG.objects.all().delete()
        return Response({})

    def post(self, request):
        if not request.user.role != ADMIN:
            return Response({"error": True, "data": "Admin role required"})
        data = request.data
        serializer = CreateFGSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if data["role"] == ADMIN:
            fg = FG.objects.create_super_user(name=data["name"], 
                            student_id=data["student_id"]
                            )
        else:
            fg = FG.objects.create(name=data["name"], 
                            student_id=data["student_id"],
                            campus=data["campus"]
                            )

        data = FGSerializer(fg).data
        
        return Response({"error": False, "data": data})

class FGUploadAPI(APIView):
    def post(self, request):
        if request.user.role != "Admin":
            return Response({"error": True, "data": "Admin role required"})

        serializer = FGFileUploadSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']

        rows = load_workbook(file).active.rows
        data_list = [[cell.value for cell in row] for row in rows]
        # remove header
        data_list.pop(0)

        # lc (LCXX), 자과fg, 자과 fg 학번, 자과 fg role, 사과fg, 사과 fg 학번, 사과 fg role, 날짜
        lc_list = []

        # 기존 data 모두 삭제
        LC.objects.all().delete()
        FG.objects.exclude(id=1).delete()

        for data in data_list:
            if FG.objects.filter(student_id = data[2]).exists():
                fg_n = FG.objects.get(student_id = data[2])
            else:
                fg_n = FG.objects.create(name=data[1], 
                                       student_id=data[2],
                                       campus="n",
                                       password=make_password(str(data[2])))

            if FG.objects.filter(student_id = data[5]).exists():
                fg_s = FG.objects.get(student_id = data[5])
            else:
                fg_s = FG.objects.create(name=data[4], 
                                       student_id=data[5],
                                       campus="s",
                                       password=make_password(str(data[5])))
            
            lc_list.append(LC.objects.create(name=data[0], fg_n_id=fg_n, 
                                fg_s_id=fg_s, total=0, schedule=data[7]))

        lc_success_data = LCSerializer(lc_list, many=True).data
        return Response({"error":False, "data": lc_success_data})