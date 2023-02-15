import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Grid, Container, Typography } from '@mui/material'
import { Colors } from '../../constant'
import { Banner, ScheduleSection, FGSection, LcSectionProp } from '../../component'
import { accesstoken, userState } from '../../store'
import { useQuery } from 'react-query'
import { LCService, ScheduleService } from '../../service'
import dayjs from 'dayjs'
import { Schedule } from '../../model'

const boxStyle = {
  padding: 40,
  boxShadow: '0px 4px 12px rgba(58,58,58,0.25)',
  borderRadius: 20,
  height: '100%',
  marginBottom: 20,
}

export default function HomeScreen() {
  const user = useRecoilValue(userState)
  const token = useRecoilValue(accesstoken)
  const [lcList, setLcList] = useState<any[]>([])
  
  const schedule = useQuery('getSchedule', async () => await ScheduleService.get(token), {
    enabled: user !== null
  })
  const lc = useQuery('getMyLC', async () => await LCService.getMyLC(token), {
    enabled: user!== null && !schedule.isLoading,
    onSuccess: (data) => {
      const lcs= setLCData(data.data)
      setLcList(lcs)
    },
  })

  const getDate = (day: number) => {
    let date = '-'
    if (!schedule.isLoading && schedule.data) {
      const sc = schedule.data.data.find((s: any) => s.day === day)
      date = dayjs(sc?.date).format('YYYY-MM-DD')
    }
    return date
  }

  const setLCData = (data: any) => {
    const lclist: LcSectionProp[] = []
    if (data) {
      data.map((item: any) => {
        lclist.push({
          id: item.id,
          name: item.name,
          fg_n: item.fg_n_id.name,
          fg_s: item.fg_s_id.name,
          total: item.total,
          schedule: getDate(item.schedule),
        })
      })
    }
    return lclist
  }

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
            {user === null && <div>로그인이 필요합니다.</div>}
            {(schedule.isLoading || lc.isLoading) && <div>Loading...</div>}
            {user!== null && !lc.isLoading && schedule.data && (
              <>
                
                <div style={{ textAlign: 'center' }}>
                  {lcList.length === 0 && (
                    <Typography>담당 LC가 없습니다.</Typography>
                  )}
                  {
                    lcList.length > 0 &&
                    lcList.map((item: LcSectionProp) => {
                      return <ScheduleSection key={item.id} lc={item} />
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
