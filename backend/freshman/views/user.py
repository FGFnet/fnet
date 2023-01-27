from rest_framework.response import Response
from rest_framework.decorators import api_view

from lc.models import LC
from freshman.models import Freshman
from freshman.serializers import FreshmanLCSerializer

@api_view(['GET'])
def getLcMemberList(request):
    lc_name = request.GET.get("lc")

    if not lc_name:
        return Response({"error": True, "data": "LC name is required"})
    print(lc_name)

    try:
        lc_id = LC.objects.get(name=lc_name)
    except LC.DoesNotExist:
        return Response({"error": True, "data": "LC does not exist"})

    queryset = Freshman.objects.filter(lc_id=lc_id)
    data = FreshmanLCSerializer(queryset, many=True).data
    
    return Response({"error": False, "data": data})