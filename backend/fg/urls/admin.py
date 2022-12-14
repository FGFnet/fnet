from django.urls import path

from ..views.admin import FGAPI

urlpatterns = [
    path('fg/', FGAPI.as_view(), name="fg_admin_api"),
]