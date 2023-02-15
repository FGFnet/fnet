import React from 'react'
import { Container, Grid } from '@mui/material'
import { Header, TodoSection } from '../../component'
import { useQuery } from 'react-query'
import { TodoService } from '../../service'
import { useRecoilValue } from 'recoil'
import { accesstoken, userState } from '../../store'

export default function TodoScreen() {
  const token = useRecoilValue(accesstoken)
  const fg = useRecoilValue(userState)
  const commontodo = useQuery(
    'getCommonTodo', 
    async() => await TodoService.get(true, token),{
    }
  )
  const mytodo = useQuery(
    'getMyTodo', 
    async() => await TodoService.get(false, token),{
    }
  )

  const refetch = (common: boolean) => {
    if (common) {
      commontodo.refetch()
    } else {
      mytodo.refetch()
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="Todo" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TodoSection 
              title="common" 
              auth={fg?.role === 'Admin'} 
              todo={commontodo.data}
              refetch={refetch}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TodoSection 
              title="my" 
              auth 
              todo={mytodo.data} 
              refetch={refetch}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
