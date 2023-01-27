from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from openpyxl import load_workbook
from django.db import transaction, IntegrityError

from lc.models import LC
from freshman.models import Freshman
from freshman.serializers import FreshmanFileUploadSerializer, FreshmanSerializer, registerFreshmanSerializer

class setFreshmanAPI(APIView):
    def get(self, request):
        try:
            queryset = Freshman.objects.all()
        except Freshman.DoesNotExist:
            return Response({"error": True, "data": "Freshman does not exist"})

        data = FreshmanSerializer(queryset, many=True).data
        
        return Response({"error": False, "data": data})

    def post(self, request):
        serializer = FreshmanFileUploadSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        print(file)
        rows = load_workbook(file).active.rows
        data_list = [[cell.value for cell in row] for row in rows]
        # remove header
        data_list.pop(0)
        # 성명/휴대폰번호/LC/지망모집단위

        freshman_list = []
        for data in data_list:
            lc_name = data[2]
            try:
                lc = LC.objects.get(name=lc_name)
            except LC.DoesNotExist:
                return Response({"error": True, "data": "LC does not exist. Check your file again"})

            if Freshman.objects.filter(name=data[0], phone_number=data[1]).exists():
                continue
            freshman_list.append(Freshman(lc=lc, name=data[1], department=data[0], phone_number=data[2]))

        try:
            with transaction.atomic():
                Freshman.objects.bulk_create(freshman_list)
        except IntegrityError as e:
            return Response({"data": str(e).split("\n")[0]})
        return Response({"error":False})

    def put(self, request):
        data = request.data
        serializer = registerFreshmanSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        try:
            freshman = Freshman.objects.get(id=data["freshman_id"])
        except Freshman.DoesNotExist:
            return Response({"error": True, "data": "Freshman does not exist"})
        
        freshman.register = not freshman.register
        freshman.save()
        return Response({"error": False, "data": {}})