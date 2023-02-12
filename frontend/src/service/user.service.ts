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

  async getFreshman() {
    return await api.get('admin/freshman/')
  }
  async getLcMemberList(lc_id: string) {
    return await api.get(`freshman?lc=${lc_id}`)
  }

  async upLoadFreshman(file: any) {
    return await api.post('admin/freshman/', file, {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  async registerFreshman(freshman_id: number) {
    return await api.put('admin/freshman/', { freshman_id })
  }
}

export default new UserService()
