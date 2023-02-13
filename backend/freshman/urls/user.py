from django.urls import path
from ..views.user import getLcMemberListAPI

urlpatterns = [
    path("freshman/", getLcMemberListAPI)
]