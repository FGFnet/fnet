import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import background from '../../image/lc_bgImg.png'

type LCStatusType = {
  sReg: number
  nReg: number
  eReg: number
  hReg: number
}
type RegisterDetailType = {
  campus: string
  department: number
  breakpoint?: boolean
}
function LCStatus({ sReg, nReg, eReg, hReg }: LCStatusType) {
  const RegisterDetail = ({ campus, department }: RegisterDetailType) => {
    return (
      <Grid container item>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          {campus}
        </Typography>
        <Typography component="div" textAlign="right">
          {department}
        </Typography>
      </Grid>
    )
  }

  const RegisterStatus = () => {
    return (
      <Grid container xs={5} sm="auto" md={5} rowSpacing={1}>
        <Grid container item>
          <Typography component="div" fontWeight="bolder" sx={{ flexGrow: 1 }}>
            전체 접수 인원
          </Typography>
          <Typography component="div" textAlign="right">
            {sReg + sReg + eReg + nReg}
          </Typography>
        </Grid>
        <RegisterDetail campus={'인사캠 접수 인원'} department={hReg + sReg} />
        <RegisterDetail campus={'자과캠 접수 인원'} department={eReg + nReg} />
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Stack
        direction={{ xs: 'row', sm: 'column', md: 'row' }}
        justifyContent="space-evenly"
        alignItems="center"
        marginY={3}
        spacing={3}
      >
        <Grid
          minWidth="130px"
          xs={3}
          sm="auto"
          md={3}
          textAlign="center"
          height="110px"
          display="flex"
          sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Typography component="div" variant="h4" fontWeight="bolder" textAlign="center" margin="auto">
            LC09
          </Typography>
        </Grid>
        <RegisterStatus />
      </Stack>
    </React.Fragment>
  )
}

export {LCStatus};