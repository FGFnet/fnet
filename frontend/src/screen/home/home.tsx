import React from 'react'
import { useRecoilValue } from 'recoil'

import { Grid, Container } from '@mui/material'
import { Colors } from '../../constant'
import { Banner, ScheduleSection, FGSection } from '../../component'
import { accesstoken, userState } from '../../store'
import { useQuery } from 'react-query'
import { LCService, ScheduleService } from '../../service'

const boxStyle = {
  padding: 40,
  boxShadow: '0px 4px 12px rgba(58,58,58,0.25)',
  borderRadius: 20,
  height: '100%',
  marginBottom: 20,
}

// TODO: schedule section api 연결
export default function HomeScreen() {
  const user = useRecoilValue(userState)
  const token = useRecoilValue(accesstoken)

  const schedule = useQuery('getSchedule', async () => await ScheduleService.get(token), {
    onSuccess: (data) => {
      console.log(data)
    },
  })
  const lc = useQuery('getLC', async() => await LCService.get(token), {
    onSuccess: (data) => {
      console.log(data)
    },
  })

  return (
    <React.Fragment>
      <Banner />
      <Container maxWidth="xl">
        <Grid container wrap="wrap" justifyContent="space-around">
          <Grid item md={4} style={boxStyle}>
            <FGSection fg={user} />
          </Grid>
          <Grid item md={6} sm={10} style={boxStyle}>
            {schedule.isLoading && <div>Loading...</div>}
            {!schedule.isLoading && schedule.data && (
              <>
                <div
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: Colors.primary,
                    fontWeight: 'bold',
                    marginBottom: 20,
                  }}
                >
                  Team-Building Schedule
                </div>
                <div style={{ textAlign: 'center' }}>
                  {schedule.data.data.map((item: any) => {
                    return (<ScheduleSection key={item.id} date={item.date} lc={9} />)
                  })}
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
