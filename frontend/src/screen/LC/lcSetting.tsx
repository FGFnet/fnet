import React from 'react'
import Header from '../../component/Header'
import { Grid, Typography } from '@mui/material'

export default function LcSettingScreen() {
  const OTDate = [
    {
      date: '2021. 2. 15.',
      lc: 'LC08',
    },
    {
      date: '2021. 2. 16.',
      lc: 'LC09',
    },
    {
      date: '2021. 2. 17.',
      lc: 'LC09',
    },
  ]

  type LcOnDutyType = {
    date: string
    lc: string
  }

  const dateFormatter = (date: string) => {
    let dateSplit = date.split('.')
    dateSplit.pop()
    dateSplit[1] = dateSplit[1].trim()
    if ((dateSplit[1] as unknown as number) < 10) {
      dateSplit[1] = '0' + dateSplit[1]
    }

    dateSplit[2] = dateSplit[2].trim()
    if ((dateSplit[2] as unknown as number) < 10) {
      dateSplit[2] = '0' + dateSplit[2]
    }

    return dateSplit.join('.')
  }

  const LcOnDuty = ({ date, lc }: LcOnDutyType) => {
    return (
      <React.Fragment>
        <Grid container marginTop={2} rowSpacing={3} columnSpacing={{ xs: 5, sm: 6, md: 7 }}>
          <Grid item>
            <Typography component="span" variant="body1">
              {dateFormatter(date)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="span" variant="body1">
              {lc}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Header title={'LC 설정'} />
      <Grid container>
        {OTDate.map((day) => (
          <LcOnDuty date={day.date} lc={day.lc} />
        ))}
      </Grid>
    </React.Fragment>
  )
}
