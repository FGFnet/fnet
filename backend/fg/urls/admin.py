from django.urls import path

from ..views.admin import FGAPI, FGUploadAPI

urlpatterns = [
    path('fg/', FGAPI.as_view(), name="fg_admin_api"),
    path('fg/upload/', FGUploadAPI.as_view(), name="fg_upload_api")
]