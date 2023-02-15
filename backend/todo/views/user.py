from ..models import Todo, Todo_check
from ..serializers import CreateTodoSerializer, TodoSerializer, EditTodoSerializer, TodoCheckSerializer, TodoAllSerializer
from fg.models import FG
from rest_framework.response import Response
from rest_framework.views import APIView


class TodoAPI(APIView):
    def get(self, request):
        get_common = True if request.GET.get("common") == 'true' else False
        try:
            if get_common:
                todos = Todo.objects.prefetch_related('todo_id')
                todos = todos.filter(common = get_common)
            else:
                todos = Todo.objects.prefetch_related('todo_id')
                todos = todos.filter(common = get_common, created_by = request.user)
        except Todo.DoesNotExist:
            msg = "Todo does not exist"
            return Response({"error": True, "data": msg})
        return Response({"error": False, "data" : TodoSerializer(todos, many=True).data})

    def post(self, request):
        serializer = CreateTodoSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        if data["common"] == False:
            todo = Todo.objects.create(created_by = request.user, 
                                        content = data["content"], 
                                        common = False)
            todo_check= Todo_check.objects.create(todo_id = todo, 
                                                fg_id = request.user, 
                                                check = False)
            return Response({"error": False, "data":  TodoSerializer(todo).data})
        else:
            try:
                fgs = FG.objects.all()
            except FG.DoesNotExist:
                msg = "FG does not exist"
                return Response({"error": True, "data": msg})
            todo = Todo.objects.create(created_by = request.user,  
                                        content = data["content"], 
                                        common = True)
            for fg in fgs: 
                todo_check= Todo_check.objects.create(todo_id = todo, 
                                                    fg_id = fg, 
                                                    check = False)
            return Response({"error": False, "data":  TodoSerializer(todo).data})
    
    def put(self, request):
        serializer = EditTodoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        try: 
            todo = Todo.objects.get(id = data.pop("id"))
        except Todo.DoesNotExist:
            msg = "Todo does not exist"
            return Response({"error":True, "data": msg})
        
        todo.content = data["content"]
        todo.save()
        return Response({"error": False, "data": TodoSerializer(todo).data})
    
    def delete(self, request):
        """
        delete notice
        """
        error = False
        todo_id = request.GET.get("id")
        if not todo_id:
            msg = "Invalid parameter, id is required"
            error = True
            return Response({"error": error, "data": msg})

        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            msg = "Todo does not exist"
            error = True
            return Response({"error": error, "data": msg})

        todo.delete()
        return Response({"error": error, "data": None})

class Todo_checkAPI(APIView):
    def put(self, request):
        serializer = TodoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        try:
            todo_check = Todo_check.objects.get(id = data["id"])
        except Todo_check.DoesNotExist:
            msg = "Todo Check does not exist"
            return Response({"error":True, "data": msg})
        
        todo_check.check = data["check"]
        todo_check.save()
        return Response({"error": False, "data": TodoCheckSerializer(todo_check).data})