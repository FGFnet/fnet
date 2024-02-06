from django.urls import path
from ..views.user import getLcMemberListAPI, getLCCountInfoAPI

urlpatterns = [
    path("freshman/", getLcMemberListAPI),
    path("freshman/count/", getLCCountInfoAPI)
]