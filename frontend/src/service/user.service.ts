import { api } from '.'

type LoginUser = {
  name: string
  password: string
}

export async function login(data: LoginUser) {
  await api.post('login/', data)
}
export async function logout() {
  await api.get('logout/')
}

export async function getFreshman() {
  return await api.get('admin/freshman/')
}

export async function getLcMemberList(lc_id: string) {
  return await api.get(`freshman?lc=${lc_id}`)
}

export async function upLoadFreshman(file: any) {
  return await api.post('admin/freshman/', file, {
    headers: { 'Content-Type': 'text/xml' },
  })
}

export async function registerFreshman(freshman_id: number) {
  return await api.put('admin/freshman/', { freshman_id })
}
