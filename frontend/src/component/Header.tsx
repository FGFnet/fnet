import React, { ReactNode } from 'react'
import { Divider, Grid } from '@mui/material'
import { Colors } from '../constant/colors.constants'
import Title from './Title'

type HeaderType = {
  title: string
  children?: ReactNode
}

export default function Header({ title, children }: HeaderType) {
  return (
    <React.Fragment>
      <Grid container wrap="wrap" sx={{ marginTop: 5, marginBottom: 3 }} alignItems="flex-end">
        <Grid item xs={10}>
          <Title title={title} background={Colors.accent} />
        </Grid>
        <Grid item xs={2}>
          {children}
        </Grid>
      </Grid>
      <Divider />
    </React.Fragment>
  )
}
