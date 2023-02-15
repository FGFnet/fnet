import { api } from '.'

type LoginUser = {
  name: string,
  password: string,
}

class UserService {
  async login(data:LoginUser) {
    return await api.post('login/', data);
  }
  async logout() {
    await api.get('logout/');
  }
  async get(id: number, token: string) {
    const data = await api.get(`fg?id=${id}`, token);
    return data.data
  }
  async getAll(token: string) {
    return await api.get('admin/fg', token)
  }
  async post(file: any, token: string) {
    return await api.post('admin/fg/upload/', file, token)
  }
}

export default new UserService()