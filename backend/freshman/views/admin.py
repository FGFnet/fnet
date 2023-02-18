from rest_framework.exceptions import ParseError
# from rest_framework.views import status
from rest_framework.views import APIView
from rest_framework.response import Response
from openpyxl import load_workbook
from django.db import transaction, IntegrityError

from lc.models import LC
from freshman.models import Freshman
from freshman.serializers import FreshmanFileUploadSerializer, FreshmanSerializer, registerFreshmanSerializer

class setFreshmanAPI(APIView):
    def get(self, request):
        if request.user.role != "Admin":
            return Response({"error": True, "data": "Admin role required"})
            
        try:
            queryset = Freshman.objects.all()
        except Freshman.DoesNotExist:
            return Response({"error": True, "data": "Freshman does not exist"})

        data = FreshmanSerializer(queryset, many=True).data
        
        return Response({"error": False, "data": data})

    def post(self, request):
        if request.user.role != "Admin":
            return Response({"error": True, "data": "Admin role required"})

        serializer = FreshmanFileUploadSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']

        rows = load_workbook(file).active.rows
        data_list = [[cell.value for cell in row] for row in rows]
        # remove header
        data_list.pop(0)

        # 성명/휴대폰번호/LC/지망모집단위
        freshman_list = []
        department_dict = {'자연과학계열':'NC', '공학계열':'EN', '사회과학계열':'SS', '인문과학계열':'HS'}
        
        for data in data_list:
            lc_name = data[2]
            try:
                lc = LC.objects.get(name=lc_name)
            except LC.DoesNotExist:
                # raise ParseError("LC does not exist. Check your file again")
                return Response({"error": True, "data": "LC does not exist. Check your file again"})

            freshman_list.append(Freshman(lc=lc, name=data[0], department=department_dict[data[3]], phone_number=data[1], register=False))

        # 기존 data 모두 삭제
        Freshman.objects.all().delete()
        
        try:
            with transaction.atomic():
                Freshman.objects.bulk_create(freshman_list)
        except IntegrityError as e:
            raise ParseError({"data": str(e).split("\n")[0]})
            
        post_success_data = FreshmanSerializer(freshman_list, many=True).data
        return Response({"error":False, "data": post_success_data})

    def put(self, request):
        if request.user.role != "Admin":
            return Response({"error": True, "data": "Admin role required"})
            
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