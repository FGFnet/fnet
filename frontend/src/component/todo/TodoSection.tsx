import React, { useState } from 'react'
import { Container, IconButton, Box, Button, Typography } from '@mui/material'
import { Title } from '../common'
import { Colors } from '../../constant'
import TodoElement from './TodoElement'
import TodoEdit from './TodoEdit'
import { FiPlusCircle as PlusIcon } from 'react-icons/fi'
import { TbEditCircle as EditIcon } from 'react-icons/tb'
import { Todo } from '../../model'

type TodoSectionProp = {
  title: string
  auth?: boolean //편집 가능 여부
  todo?: { data: Todo[]; error: boolean }
  refetch: Function
}
type Mode = 'normal' | 'add' | 'edit'

export default function TodoSection(props: TodoSectionProp) {
  const title = props.title
  const todo = props.todo?.data
  const [mode, setMode] = useState<Mode>('normal')

  const refetch = (common: boolean) => {
    props.refetch(common)
  }

  const handleCheck = (common: boolean) => {
    props.refetch(common)
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title title={title} background={Colors.primary_lighter} variant="h5" />
          {typeof todo === 'undefined' && <Typography>Loading...</Typography>}
          {typeof todo !== 'undefined' && mode === 'normal' && props.auth && (
            <Box>
              <IconButton color="primary" onClick={() => setMode('edit')} style={{ width: 35, height: 35 }}>
                <EditIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => setMode('add')} style={{ width: 35, height: 35 }}>
                <PlusIcon />
              </IconButton>
            </Box>
          )}
          {typeof todo !== 'undefined' && mode !== 'normal' && (
            <Button
              onClick={() => {
                setMode('normal')
              }}
            >
              완료
            </Button>
          )}
        </Box>
        {typeof todo !== 'undefined' && mode !== 'add' && todo?.length === 0 && (
          <Typography sx={{ mt: 2, textAlign: 'center' }}>No Todo List</Typography>
        )}
        {typeof todo !== 'undefined' &&
          (mode === 'normal' || mode === 'add') &&
          todo?.map((t: any) => (
            <TodoElement
              key={t.id}
              id={t.id}
              content={t.todo_id.content}
              check={t.check}
              handleCheck={handleCheck}
              mode={title}
            />
          ))}
        {typeof todo !== 'undefined' &&
          mode === 'edit' &&
          // todo?.length > 0 &&
          todo?.map((t: any) => <TodoEdit key={t.id} todo={t.todo_id} refetch={refetch} mode={title} />)}
        {typeof todo !== 'undefined' && mode === 'add' && <TodoEdit refetch={refetch} mode={title} />}
      </Container>
    </React.Fragment>
  )
}
