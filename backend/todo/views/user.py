from ..models import Todo, Todo_check
from ..serializers import CreateTodoSerializer
from fg.models import FG
from rest_framework.response import Response
from rest_framework.views import APIView


class TodoAPI(APIView):
    def get(self, request):
        get_common = request.GET.get("common")
        try:
            todos = Todo.objects.prefetch_related('todo_id').filter(common = get_common, fg_id = request.user)
        except Todo.DoesNotExist:
            msg = "Todo does not exist"
            return Response({"error": True, "data": msg})
        return Response({"error": False, "data" : todos})

    def post(self, request):
        data = request.data
        serializer = CreateTodoSerializer(data)
        if data.objects.get(common = False):
            todo = Todo.objects.create(create_by = request.user, content = data["content"],common = False)
            todo_check= Todo_check.objects.create(todo_id = todo["id"], fg_id = request.user, check = False)
            return Response({"error": False, "data": todo})
        else:
            try:
                fgs = FG.objects.get()
            except FG.DoesNotExist:
                msg = "FG does not exist"
                return Response({"error": True, "data": msg})
            for fg in fgs:
                todo = Todo.objects.create(create_by = request.user, content = data["content"],common = False)
                todo_check= Todo_check.objects.create(todo_id = todo["id"], fg_id = fg["id"], check = False)
            return Response({"error": False, "data": todo})
    
    def put(self, request):
        data = request.data
        try: 
            todo = Todo.objects.get(id = data.pop("id"))
        except Todo.DoesNotExist:
            msg = "Todo does not exist"
            return Response({"error":True, "data": msg})
        
        todo.centent = data["content"]
        todo.save()
        return Response({"error": False, "data": todo})

class Todo_checkAPI(APIView):
    def put(self, request):
        data = request.data
        try:
            todo_check = Todo_check.objects.get(id = data["id"])
        except Todo_check.DoesNotExist:
            msg = "Todo Check does not exist"
            return Response({"error":True, "data": msg})
        
        todo_check.check = data["check"]
        todo_check.save()
        return Response({"error": False, "data": todo_check})