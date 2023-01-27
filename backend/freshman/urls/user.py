from django.urls import path
from ..views.user import getLcMemberList

urlpatterns = [
    path("freshman/", getLcMemberList)
]