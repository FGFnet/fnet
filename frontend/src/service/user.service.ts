import { api } from '.'

export async function login(name: string, student_id: string) {
  await api.post('login/', { name: name, password: student_id })
}
