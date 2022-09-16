import React from 'react'
import { Typography, Box, Checkbox } from '@mui/material'
import { Colors } from '../../../constant/colors.constants'


type TodoProp = {
  id: number
  content: string
  check: boolean
  handleCheck: Function
}

export default function TodoSection(props: TodoProp) {
  const check = props.check
  const content = props.content

  const handleCheck = (check: boolean) => {
    props.handleCheck(props.id, check);
  }

  return (
    <React.Fragment>
      <Box sx={{display:'flex', justifyContent: 'space-between'}}>
        <Box
          sx= {{display: 'flex', alignItems:'center'}}
        >
          <Checkbox checked={check} onChange={(event) => handleCheck(event.target.checked)}/>
          { check && <Typography sx={{color: Colors.light, textDecoration: 'line-through'}}>{content}</Typography>}
          { !check && <Typography>{content}</Typography>}
        </Box>
      </Box>
    </React.Fragment>
  )
}
