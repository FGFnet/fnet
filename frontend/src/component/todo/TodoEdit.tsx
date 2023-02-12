import React, { useState } from 'react'
import { Box, Checkbox, TextField, IconButton, Alert, AlertTitle, Collapse, Button } from '@mui/material'
import { BiCheckCircle as CheckIcon } from 'react-icons/bi'
import { TbTrash as DeleteIcon } from 'react-icons/tb'
import { TodoService } from '../../service'
import { useMutation } from 'react-query'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'
import { Todo } from '../../model'

type editProp = {
  addTodo?: Function
  updateTodo?: Function
  deleteTodo?: Function
  todo?: Todo
  mode: string
}

export default function TodoEdit(props: editProp) {
  const initContent = props.todo ? props.todo.content : ''
  // const check = props.todo ? props.todo.check : false
  const check = false
  const id = props.todo ? props.todo.id : null
  const common = props.mode === 'common' ? true : false
  const token = useRecoilValue(accesstoken)

  const [content, setContent] = useState(initContent)
  const [alertOpen, setAlertOpen] = useState(false)
  

  const createTodo = useMutation(
    'createTodo',
    async (param: any) => await TodoService.create(param.data, token), 
    {
      onSuccess: () => {
        setContent('')
      },
      onError: (err: any) => {
        alert(err)
      }
    }
  );

  const addTodo = () => {
    // add mode
    if (!props.todo && props.addTodo) {
      const newTodo = {
        content: content.trim(),
        common: common
      }
      createTodo.mutate({data:newTodo})
      props.addTodo(common)
    }
  }

  const deleteTodo = () => {
    if (props.deleteTodo) {
      props.deleteTodo(id)
    }
  }

  const isEnglish = (c: string) => {
    if (c >= 'a' && c <= 'z') return true
    else if (c >= 'A' && c <= 'Z') return true
    return false
  }

  const enterEvent = (event: React.KeyboardEvent) => {
    if (!props.todo && event.key === 'Enter') {
      setContent(content.trim())
      const lastChar = content[content.length - 1]
      if (!isEnglish(lastChar) && !event.nativeEvent.isComposing) {
        setContent('')
        return
      } else addTodo()
    }
  }

  const inputEvent = (event: React.KeyboardEvent) => {
    if (props.updateTodo) {
      props.updateTodo(id, content)
    }
  }

  const DeleteAlert = () => {
    return (
      <Collapse in={alertOpen} sx={{ position: 'fixed', top: '30vh', left: '30vw', zIndex: 50 }}>
        <Alert
          severity="error"
          action={
            <Box>
              <Button
                onClick={() => {
                  setAlertOpen(false)
                  deleteTodo()
                }}
              >
                삭제
              </Button>
              <Button onClick={() => setAlertOpen(false)}>취소</Button>
            </Box>
          }
        >
          <AlertTitle>삭제</AlertTitle>
          정말 삭제하시겠습니까?
        </Alert>
      </Collapse>
    )
  }

  return (
    <React.Fragment>
      <DeleteAlert />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox disabled={true} checked={check} />
        <TextField
          fullWidth
          variant="standard"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={(event) => enterEvent(event)}
          onKeyUp={(event) => inputEvent(event)}
        />
        {!props.todo && (
          <IconButton color="primary" onClick={addTodo}>
            <CheckIcon />
          </IconButton>
        )}
        {props.todo && (
          <IconButton color="primary" onClick={() => setAlertOpen(true)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </React.Fragment>
  )
}
