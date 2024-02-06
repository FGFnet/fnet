from rest_framework.response import Response
from rest_framework.decorators import api_view

from lc.models import LC
from freshman.models import Freshman
from freshman.serializers import FreshmanLCSerializer

@api_view(['GET'])
def getLcMemberListAPI(request):
    # check login
    if not request.user.is_authenticated:
        return Response({"error": True, "data": "login required"})
    
    fg_id = request.user.id
    fg_role = request.user.role

    lc_name = request.GET.get("lc")
    if not lc_name:
        return Response({"error": True, "data": "LC is required"})
    
    try:
        lc = LC.objects.get(name=lc_name)
    except LC.DoesNotExist:
        return Response({"error": True, "data": "LC does not exist"})

    # Admin 제외 자기 LC만 열람 가능?

    queryset = Freshman.objects.filter(lc_id=lc.id)
    data = FreshmanLCSerializer(queryset, many=True).data
    
    return Response({"error": False, "data": data})

@api_view(['GET'])
def getLCCountInfoAPI(request):
    # check login
    if not request.user.is_authenticated:
        return Response({"error": True, "data": "login required"})
    
    fg_id = request.user.id
    fg_role = request.user.role

    lc_name = request.GET.get("lc")
    if not lc_name:
        return Response({"error": True, "data": "LC is required"})

    try:
        lc = LC.objects.get(name=lc_name)
    except LC.DoesNotExist:
        return Response({"error": True, "data": "LC does not exist"})

    # Admin 제외 자기 LC만 열람 가능?

    queryset = Freshman.objects.filter(lc_id=lc.id)
    total = queryset.count()
    register_total =  queryset.filter(register=True)
    data = { "total" : total, "register" : register_total.count() }
    
    return Response({"error": False, "data": data})