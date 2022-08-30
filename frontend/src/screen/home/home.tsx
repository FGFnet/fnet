import React from 'react'
import { Colors } from '../../constant'
import Banner from './component/Banner'
import ScheduleSection from './component/scheduleSection'
import FGSection from './component/fgSection'
import { FiSettings } from 'react-icons/fi'
import {Grid, IconButton} from '@mui/material'
import { useNavigate } from "react-router-dom"

// TODO : 설정 버튼 눌렀을때 url에 로그인한 유저 id 들어가도록 수정 (API 연결 후)
export default function HomeScreen() {
  const boxStyle = {
    padding: 40,
    boxShadow: '0px 4px 12px rgba(58,58,58,0.25)',
    borderRadius: 20,
    height: '100%',
    marginBottom: 20
  }
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Banner />
      <Grid container wrap="wrap" justifyContent="space-around">
        <Grid item md={4} style={boxStyle}>
          <FGSection />
        </Grid>
        <Grid item md={6} sm={10} style={boxStyle}>
          <div style={{fontSize: 20, textAlign: 'center', color: Colors.primary, fontWeight: 'bold', marginBottom: 20,}}>
            Team-Building Schedule 
            <IconButton aria-label="setting" onClick={()=>{navigate('/:id/setting')}}>
              <FiSettings/>
            </IconButton>
          </div>
          <div style={{textAlign: 'center'}}>
            <ScheduleSection date="2023.02.15" lc={9}/>
            <ScheduleSection date="2023.02.16" lc={16}/>
            <ScheduleSection date="2023.02.17"/>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
