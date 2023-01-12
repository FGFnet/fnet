import React, { useState } from 'react'
import { Box, Checkbox, TextField, IconButton } from '@mui/material'
import { BiCheckCircle as CheckIcon } from 'react-icons/bi'

type Todo = {
  id: number
  content: string
  check: boolean
}
type editProp = {
  addTodo?: Function
  updateTodo?: Function
  todo?: Todo
}

export default function TodoEdit(props: editProp) {
  const initContent = props.todo ? props.todo.content : ''
  const check = props.todo ? props.todo.check : false
  const [content, setContent] = useState(initContent)

  const addTodo = () => {
    // add mode
    if (!props.todo && props.addTodo) {
      const newTodo = {
        content: content.trim(),
        check: false,
      }
      setContent('')
      props.addTodo(newTodo)
    }
  }
  const updateTodo = () => {
    if(props.updateTodo) props.updateTodo()
    // update api 호출
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
    // if (props.updateTodo) {
    //   props.updateTodo(id, content)
    // }
  }

  return (
    <React.Fragment>
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
        <IconButton color="primary" onClick={() => props.todo ? updateTodo(): addTodo()}>
          <CheckIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  )
}
