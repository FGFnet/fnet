import {api} from '.'
import { Comment, Notice } from '../model';

class NoticeServiceClass {
    async create(input: Pick<Notice, "title" | "content">, token: string) {
        return await api.post('admin/notice/', input, token);
    }
    async get(id?:number, token?: string) {
        const data =  id ? await api.get(`notice?id=${id}`, token) : await api.get('notice/', token)
        return data.data
    }
}

class CommentServiceClass {
    async get(id: number, token: string) {
        const data = await api.get(`comment?notice_id=${id}`, token)
        return data.data
    }
    async check(input: Pick<Comment, "id" | "check">, token: string) {
        return await api.put('admin/comment/', input, token)
    }
    async create(input: Pick<Comment, "notice_id"|"content">, token: string) {
        return await api.post('comment/', input, token)
    }
}

const NoticeService = new NoticeServiceClass()
const CommentService = new CommentServiceClass()

export {NoticeService, CommentService}