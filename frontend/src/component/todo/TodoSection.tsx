import React, { useState } from 'react'
import { Container, IconButton, Box, Button, Typography } from '@mui/material'
import { Title } from '../common'
import { Colors } from '../../constant'
import TodoElement from './TodoElement'
import TodoEdit from './TodoEdit'
import { FiPlusCircle as PlusIcon } from 'react-icons/fi'
import { TbEditCircle as EditIcon } from 'react-icons/tb'
import { TodoService } from '../../service'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'
import { Todo } from '../../model'

type TodoSectionProp = {
  title: string
  auth?: boolean //편집 가능 여부
}
type Mode = 'normal' | 'add' | 'edit'

export default function TodoSection(props: TodoSectionProp) {
  const token = useRecoilValue(accesstoken)
  const title = props.title
  const [common, setCommon] = React.useState<boolean>(props.title === 'common' ? true : false)
  const data: any[] = [
    { id: 1, content: 'todo' },
    { id: 2, content: 'todo' },
  ]
  const [todoList, setTodoList] = useState<any[]>(data)
  const [mode, setMode] = useState<Mode>('normal')
  const todo = useQuery(
    'getTodo', 
    async() => await TodoService.get(common, token),{
      onSuccess: () =>{
        console.log(common)
      }
    }
  )

  const addTodo = (common: boolean) => {
    todo.refetch()
  }

  const handleCheck = (id: number, check: boolean) => {
    const newTodoList: Todo[] = todoList.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, check: check }
      }
      return todo
    })

    setTodoList(newTodoList)
  }

  const updateTodo = (id: number, content: string) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: content }
      }
      return todo
    })
    setTodoList(newTodoList)
  }
  const deleteTodo = (id: number) => {
    const index = todoList.findIndex((todo) => {
      return todo.id === id
    })
    const newTodo = todoList.splice(index, 1)
    setTodoList(newTodo)
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title title={title} background={Colors.primary_lighter} variant="h5" />
          {mode === 'normal' && props.auth && (
            <Box>
              <IconButton color="primary" onClick={() => setMode('edit')} style={{ width: 35, height: 35 }}>
                <EditIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => setMode('add')} style={{ width: 35, height: 35 }}>
                <PlusIcon />
              </IconButton>
            </Box>
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
        {todo.isLoading && <Typography>Loading...</Typography>}
        {!todo.isLoading && mode !== 'add' && todo.data.length === 0 && (
          <Typography sx={{ mt: 2, textAlign: 'center' }}>No Todo List</Typography>
        )}
        {!todo.isLoading &&(mode === 'normal' || mode === 'add') &&
          todo.data.length > 0 &&
          todo.data.map((t: Todo) => (
            <TodoElement id={t.id} content={t.content} check={false} handleCheck={handleCheck} />
          ))}
        {!todo.isLoading &&mode === 'edit' &&
          todo.data.length > 0 &&
          todo.data.map((t: Todo) => <TodoEdit todo={t} deleteTodo={deleteTodo} updateTodo={updateTodo} mode={title} />)}
        {!todo.isLoading &&mode === 'add' && <TodoEdit addTodo={addTodo} mode={title} />}
      </Container>
    </React.Fragment>
  )
}
