import {api} from '.'
import { Notice } from '../model';

class NoticeService {
    async create(data: Pick<Notice, "title" | "content">, token: string) {
        return await api.post('admin/notice/', data, token);
    }
    async get(id?:number, token?: string) {
        const data =  id ? await api.get(`notice?id=${id}`, token) : await api.get('notice', token)
        return data.data
    }
}

export default new NoticeService()