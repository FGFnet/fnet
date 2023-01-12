import React, { useState } from 'react'
import { Container, IconButton, Box, Button, Typography } from '@mui/material'
import { Title } from '../common'
import { Colors } from '../../constant'
import TodoEdit from './TodoEdit'
import { FiPlusCircle as PlusIcon } from 'react-icons/fi'
import { Todo, TodoMode} from './type'
import TodoNormal from './TodoNormal'

const data: Todo[] = [
  { id: 1, content: 'todo', check: true },
  { id: 2, content: 'todo', check: false },
]

type TodoSectionProp = {
  title: string
  auth?: boolean //편집 가능 여부
}

export default function TodoSection(props: TodoSectionProp) {
  const title = props.title
  const [todoList, setTodoList] = useState<Todo[]>(data)
  const [mode, setMode] = useState<TodoMode>('normal')

  const handleCheck = (id: number, check: boolean) => {
    const newTodoList: Todo[] = todoList.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, check: check }
      }
      return todo
    })

    setTodoList(newTodoList)
  }
  const addTodo = (todo: any) => {
    const newTodo = { ...todo, id: todoList.length + 1 }
    setTodoList([...todoList, newTodo])
  }

  const TodoSectionHeader = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title title={title} background={Colors.primary_lighter} variant="h5" />
        {mode === 'normal' && props.auth && (
          <IconButton color="primary" onClick={() => setMode('add')} style={{ width: 35, height: 35 }}>
            <PlusIcon />
          </IconButton>
        )}
        {mode !== 'normal' && (
          <Button
            onClick={() => {
              setMode('normal')
            }}
          >
            완료
          </Button>
        )}
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        <TodoSectionHeader />
        {mode !== 'add' && todoList.length === 0 && (
          <Typography sx={{ mt: 2, textAlign: 'center' }}>No Todo List</Typography>
        )}
        {
          todoList.length > 0 &&
          todoList.map((todo) => (
            <TodoNormal mode={mode} todo={todo} handleCheck={handleCheck} auth={props.auth ?? false} />
          ))
        }
        {mode === 'add' && <TodoEdit addTodo={addTodo} />}
      </Container>
    </React.Fragment>
  )
}
