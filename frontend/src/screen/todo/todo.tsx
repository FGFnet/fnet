import React from 'react'
import { Container, Grid } from '@mui/material'
import { Header } from '../../component'
import { TodoSection } from './components'

export default function TodoScreen() {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="Todo" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TodoSection title="common" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TodoSection title="my" auth />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
