import React, {useState} from 'react'
import { Container, IconButton, Box, Button, Typography } from '@mui/material'
import {Title} from '../../../component'
import { Colors } from '../../../constant/colors.constants'
import TodoElement from './TodoElement'
import TodoEdit from './TodoEdit'
import {FiPlusCircle as PlusIcon} from 'react-icons/fi'
import {TbEditCircle as EditIcon} from 'react-icons/tb'

type Todo = {
  id: number
  content: string
  check: boolean
}
type TodoSectionProp = {
  title: string
  auth?: boolean //편집 가능 여부
}
type Mode = 'normal' | 'add' | 'edit'

export default function TodoSection(props:TodoSectionProp) {
  const title = props.title
  const data: Todo[] = [
    {id: 1, content: "todo", check: true},
    {id: 2, content: "todo", check: false}
  ]
  const [todoList, setTodoList] = useState<Todo[]>(data)
  const [mode, setMode] = useState<Mode>('normal')

  const handleCheck = (id:number, check: boolean) => {
    const newTodoList: Todo[] = todoList.map((todo: Todo) => {
      if (todo.id === id) {
        return {...todo, check: check}
      }
      return todo;
    })

    setTodoList(newTodoList);
  }
  const addTodo = (todo: any) => {
    const newTodo = {...todo, id: todoList.length + 1}
    setTodoList([...todoList, newTodo])
  }
  const updateTodo = (id: number, content: string) => {
    const newTodoList = todoList.map(todo => {
      if(todo.id === id) {
        return {...todo, content: content}
      }
      return todo
    })
    setTodoList(newTodoList)
  }
  const deleteTodo = (id: number) => {
    const index = todoList.findIndex(todo => {return todo.id === id})
    const newTodo = todoList.splice(index, 1);
    setTodoList(newTodo)
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{marginTop: 2}}>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Title title={title} background={Colors.primary_lighter} />
          {mode==='normal' && props.auth && (
            <Box>
              <IconButton color="primary" onClick={() => setMode('edit')}><EditIcon /></IconButton>
              <IconButton color="primary" onClick={() => setMode('add')}><PlusIcon /></IconButton>
            </Box>
          )}
          {mode!=='normal' &&  (
            <Button onClick={() =>{ setMode('normal')}}>완료</Button>
          )}
        </Box>
        {mode!=='add' && todoList.length === 0 && (
          <Typography sx={{mt:2, textAlign: 'center'}}>No Todo List</Typography>
        )}
        {(mode==='normal' || mode === 'add') && todoList.length > 0 && todoList.map(todo => (
          <TodoElement id={todo.id} content={todo.content} check={todo.check} handleCheck={handleCheck} />
        ))}
        {mode==='edit' && todoList.length > 0 && todoList.map(todo => (
          <TodoEdit todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
        ))}
        {mode==='add' && (<TodoEdit addTodo={addTodo}/>)}
      </Container>
    </React.Fragment>
  )
}
