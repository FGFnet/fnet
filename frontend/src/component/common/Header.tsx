import React, { ReactNode } from 'react'
import { Divider, Grid } from '@mui/material'
import { Colors } from '../../constant'
import {Title} from './Title'

type HeaderType = {
  title: string
  children?: ReactNode
}

function Header({ title, children }: HeaderType) {
  return (
    <React.Fragment>
      <Grid container wrap="wrap" sx={{ marginTop: 5, marginBottom: 3 }} alignItems="flex-end">
        <Grid item xs={10}>
          <Title variant="h4" title={title} background={Colors.accent} />
        </Grid>
        <Grid item xs={2}>
          {children}
        </Grid>
      </Grid>
      <Divider />
    </React.Fragment>
  )
}

export {Header};
