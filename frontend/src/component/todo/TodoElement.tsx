import React from 'react'
import { Typography, Box, Checkbox } from '@mui/material'
import { Colors } from '../../constant'
import { useMutation } from 'react-query'
import { TodoCheckService } from '../../service'

type TodoProp = {
  id: number
  content: string
  check: boolean
  handleCheck: Function
  mode: string
}

export default function TodoSection(props: TodoProp) {
  const check = props.check
  const content = props.content
  const common = props.mode === 'common' ? true : false

  const checkTodo = useMutation(
    'checkTodo',
    async () => await TodoCheckService.put({id: props.id, check: !check}), 
    {
      onSuccess: () => {
        if (props.handleCheck) {
          props.handleCheck(common)
        }
      },
      onError: (err: any) => {
        alert(err)
      }
    }
  )

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={check} onChange={() => checkTodo.mutate()} />
          {check && <Typography sx={{ color: Colors.light, textDecoration: 'line-through' }}>{content}</Typography>}
          {!check && <Typography>{content}</Typography>}
        </Box>
      </Box>
    </React.Fragment>
  )
}
