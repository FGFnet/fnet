import { FG } from "./user"

export type Notice = {
    id: number,
    created_by: FG,
    create_time: string,

    title: string,
    content: string,
}

export type Comment = {
    id: number,
    created_by: FG,
    create_time: string,

    notice_id: number,
    content: string,
    check: boolean
}