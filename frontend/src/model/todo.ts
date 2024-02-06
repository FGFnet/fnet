import { FG } from "./user"

export type Todo = {
    id: number,
    created_by: FG,
    content: string,
    common : boolean
}

export type TodoCheck = {
    id : number,
    todo_id : number,
    fg_id : number,
    check : boolean
}

