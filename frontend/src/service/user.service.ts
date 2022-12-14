import { api } from '.'

type LoginUser = {
  name: string,
  password: string,
}

export async function login(data: LoginUser) {
  await api.post('login/', data);
}
export async function logout() {
  await api.get('logout/');
}