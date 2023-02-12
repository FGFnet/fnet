import {api} from '.'
import { Todo,TodoCheck } from '../model';

class TodoServiceClass {
    async create(input: Pick<Todo, "content"|"common">){
        return await api.post('todo/', input);
    }
    async get(common:boolean){
        return await api.get(`todo?common=${common}`);
    }
    async put(input: Pick<Todo, "content"|"id">){
        return await api.post('todo/', input);
    }
}

class TodoCheckServiceClass{
    async put(input: Pick<TodoCheck, "check"|"id">){
        return await api.put('todocheck/',input)
    }
}

const TodoService = new TodoServiceClass()
const TodoCheckService = new TodoCheckServiceClass()

export {TodoService,TodoCheckService}