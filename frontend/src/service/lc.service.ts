import {api} from '.'
import { Schedule } from '../model';

class LCServiceClass {
    async get(token: string) {
        return await api.get('admin/LC/', token);
    }
    async getMyLC(token: string) {
        return await api.get('LC/', token);
    }
    async getTodayLC(token: string) {
        return await api.get('TodayLC/', token)
    }
    async post(id?:number, token?: string) {
        const data =  id ? await api.post(`notice?id=${id}`, token) : await api.get('notice', token)
        return data.data
    }
}

class ScheduleServiceClass {
    async get(token: string) {
        return await api.get('schedule', token)
    }
    async create(input: Schedule, token: string) {
        return await api.post('admin/schedule/', input, token)
    }
}

const LCService = new LCServiceClass()
const ScheduleService = new ScheduleServiceClass()

export {LCService, ScheduleService}