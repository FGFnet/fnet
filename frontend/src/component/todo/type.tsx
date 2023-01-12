export type Todo = {
  id: number
  content: string
  check: boolean
}

export type TodoMode = "add" | "edit" | "normal"