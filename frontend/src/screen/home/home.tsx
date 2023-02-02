import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useQuery } from 'react-query'

import { Grid, Container } from '@mui/material'
import { Colors } from '../../constant'
import {Banner, ScheduleSection, FGSection} from '../../component'
import { accesstoken, userState } from '../../store'
import { UserService } from '../../service'

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

  return (
    <React.Fragment>
      <Banner />
      <Container maxWidth="xl">
        <Grid container wrap="wrap" justifyContent="space-around">
          <Grid item md={4} style={boxStyle}>
            <FGSection fg={user} />
          </Grid>
          <Grid item md={6} sm={10} style={boxStyle}>
            <div
              style={{ fontSize: 20, textAlign: 'center', color: Colors.primary, fontWeight: 'bold', marginBottom: 20 }}
            >
              Team-Building Schedule
            </div>
            <div style={{ textAlign: 'center' }}>
              <ScheduleSection date="2023.02.15" lc={9} />
              <ScheduleSection date="2023.02.16" lc={16} />
              <ScheduleSection date="2023.02.17" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
