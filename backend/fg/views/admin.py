from ..models import FG
from ..serializers import (FGSerializer, CreateFGSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

class FGAPI(APIView):
    def get(self, request):
        if request.user.role != ADMIN:
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
            fg = FG.objects.create_user(name=data["name"], 
                            student_id=data["student_id"],
                            campus=data["campus"]
                            )

        # try:
        #     with transaction.atomic():
        #         Freshman.objects.bulk_create()
        # except IntegrityError as e:
        #     return self.Response({"data": str(e).split("\n")[1]})

        data = FGSerializer(fg).data
        
        return Response({"error": False, "data": data})
