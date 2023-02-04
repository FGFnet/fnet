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
}

export default new UserService()