import React from 'react'
import { Typography, Box, Checkbox, IconButton, Button, Modal } from '@mui/material'
import { Colors } from '../../constant'
import { TbEditCircle as EditIcon, TbTrash as DeleteIcon } from 'react-icons/tb'
import { TodoMode, Todo } from './type'
import TodoEdit from './TodoEdit'

type TodoProp = {
  todo: Todo
  handleCheck: Function
  mode: TodoMode
  auth: boolean
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  py: 2,
  px: 4,
  textAlign: 'center'
}

// 내용 표시, edit, delete 버튼
export default function TodoNormal(props: TodoProp) {
  const check = props.todo.check
  const content = props.todo.content
  const mode = props.mode
  const [elementEdit, setElementEdit] = React.useState(false)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)

  const handleCheck = (check: boolean) => {
    props.handleCheck(props.todo.id, check)
  }
  const deleteTodo = (id: number) => {console.log(id)}
  const updateTodo = () => {setElementEdit(false)}

  const DeleteModal = () => {
    return (
      <Modal
        open={alertOpen}
        onClose={()=>{setAlertOpen(false)}}
      >
        <Box sx={{...modalStyle}}>
          <p>
            정말 삭제하시겠습니까?
          </p>
          <Button onClick={()=>{setAlertOpen(false); deleteTodo(props.todo.id)}}>삭제</Button>
          <Button onClick={()=>setAlertOpen(false)}>취소</Button>
        </Box>
      </Modal>
    )
  }

  return (
    <React.Fragment>
      <DeleteModal />
      {!elementEdit && 
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={check} onChange={(event) => handleCheck(event.target.checked)} />
            {check && <Typography sx={{ color: Colors.light, textDecoration: 'line-through' }}>{content}</Typography>}
            {!check && <Typography>{content}</Typography>}
          </Box>
          {props.auth && mode !== 'add' && 
            <Box>
              <IconButton color="primary" onClick={() => setElementEdit(true)} style={{ width: 35, height: 35 }}>
                <EditIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => setAlertOpen(true)} style={{ width: 35, height: 35 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        </Box>
      }
      { elementEdit && <TodoEdit todo={props.todo} updateTodo={updateTodo} />}
    </React.Fragment>
  )
}
