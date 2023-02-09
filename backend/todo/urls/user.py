from django.urls import path
from ..views.user import Todo_checkAPI, TodoAPI

urlpatterns = [
    path('todo/', Todo_checkAPI.as_view(), name="Todocheck_api"),
    path('todocheck/', TodoAPI.as_view(), name="Todo_api"),
]