import React from 'react'
import { Colors } from '../../constant'
import {Banner, ScheduleSection, FGSection} from '../../component'
import { Grid, Container } from '@mui/material'

export default function HomeScreen() {
  const boxStyle = {
    padding: 40,
    boxShadow: '0px 4px 12px rgba(58,58,58,0.25)',
    borderRadius: 20,
    height: '100%',
    marginBottom: 20,
  }

  const scheduledata = 
    [
      {date: "2023.02.03", name: "LC09", fg_n: "정노원fg", fg_s: "하솔비fg", total: 20},
      {date: "2023.02.04", name: "LC10", fg_n: "정노원fg", fg_s: "하솔비fg", total: 20},
      {date: "2023.02.04", name: "LC11", fg_n: "정노원fg", fg_s: "하솔비fg", total: 20},
    ]
  ;

  return (
    <React.Fragment>
      <Banner />
      <Container maxWidth="xl">
        <Grid container wrap="wrap" justifyContent="space-around">
          <Grid item md={4} style={boxStyle}>
            <FGSection />
          </Grid>
          <Grid item md={6} sm={10} style={boxStyle}>
            <div
              style={{ fontSize: 20, textAlign: 'center', color: Colors.primary, fontWeight: 'bold', marginBottom: 20 }}
            >
              Team-Building Schedule
            </div>
            <div style={{ textAlign: 'center' }}>
              {scheduledata.map((schedule) => (
                <ScheduleSection props={schedule}/>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
