from django.urls import path

from ..views.user import NoticeAPI, CommentAPI


urlpatterns = [
    path("notice/", NoticeAPI.as_view(), name="notice_api"),
    path("comment/", CommentAPI.as_view(), name="comment_api"),
]