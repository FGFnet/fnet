from django.urls import path
from ..views.user import Todo_checkAPI, TodoAPI

urlpatterns = [
    path('todocheck/', Todo_checkAPI.as_view(), name="Todocheck_api"),
    path('todo/', TodoAPI.as_view(), name="Todo_api"),
]