from django.urls import path
from ..views.admin import setFreshmanAPI

urlpatterns = [
    path("freshman/", setFreshmanAPI.as_view())
]