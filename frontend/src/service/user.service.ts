import { api } from '.'

type LoginUser = {
  name: string
  password: string
}

class UserService {
  async login(data: LoginUser) {
    return await api.post('login/', data)
  }
  async logout() {
    await api.get('logout/')
  }
  async get(id: number, token: string) {
    const data = await api.get(`fg?id=${id}`, token)
    return data.data
  }
  async getAll(token: string) {
    return await api.get('admin/fg', token)
  }
  async post(file: any, token: string) {
    return await api.post('admin/fg/upload/', file, token)
  }
  async getFreshman(token: string) {
    return await api.get('admin/freshman/', token)
  }
  async getLcMemberList(lc_id: string, token: string) {
    return await api.get(`freshman?lc=${lc_id}`, token)
  }
  async getLCMemberCount(lc_id: string, token: string) {
    return await api.get(`freshman/count?lc=${lc_id}`, token)
  }

  async upLoadFreshman(file: any, token: string) {
    return await api.post('admin/freshman/', file, token)
  }

  async registerFreshman(freshman_id: number, token: string) {
    return await api.put('admin/freshman/', { freshman_id }, token)
  }
}

export default new UserService()
