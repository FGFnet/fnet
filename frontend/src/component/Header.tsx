import React from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Colors } from '../constant/colors.constants'
import { Link } from 'react-router-dom'
import Title from './Title'

type HeaderType = {
  title: string
  btn?: string
}

export default function Header({ title, btn }: HeaderType) {
  function NewPostBtn() {
    return (
      <Box textAlign="right">
        <Button
          component={Link}
          to="create"
          sx={{
            fontWeight: 'bold',
            color: Colors.black,
          }}
        >
          {btn}
        </Button>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Grid container wrap="wrap" sx={{ marginTop: 5, marginBottom: 3 }} alignItems="flex-end">
        <Grid item xs={10}>
          <Title title={title} background={Colors.accent} />
        </Grid>
        <Grid item xs={2}>
          {btn ? <NewPostBtn /> : null}
        </Grid>
      </Grid>
      <Divider />
    </React.Fragment>
  )
}
