import {CSSProperties} from 'react'
import { Colors } from '../../../constant'
import Logo from '../../../image/home_4.png'
import style from './home.module.css'
import {useMediaQuery} from '@mui/material'

export default function Banner() {
  const green : CSSProperties= {
    borderTop: '300px solid #D0DBCC',
    borderRight: '150px solid transparent',
    height: 0,
    width: '70%',
    position:'absolute', 
    top:-50,
    left: 0,
    zIndex: 0
  }
  const yellow : CSSProperties= {
    borderBottom: '300px solid #F9EFCC',
    borderLeft: '150px solid transparent',
    height: 0,
    width: '80%',
    position:'absolute', 
    top:-50,
    right:0,
    zIndex: 0
  }
  const breakPoint = useMediaQuery('(min-width:768px)')

  return (
    <div style={{height: 300, position:'relative', width: '100vw'}}>
      <div style={{display: 'flex', justifyContent:'space-between', width: '100vw'}}>
        <div style={green} />
        <div style={yellow} />
      </div>
      <div style={{display: 'flex', alignItems:'center', justifyContent: 'start', height:'85%', marginLeft: '17%'}} className={style.ani}>
        {breakPoint && <img src={Logo} alt='logo' style={{width: '15%', position:'relative', marginRight: 60, transform:`rotate(25deg)`}} /> }
        <div>
          <div style={{fontSize: 30, fontWeight:'bold', color: Colors.primary, position:'relative'}}>FRESHMAN GUIDE</div>
          <div style={{fontSize: 24, color: Colors.primary, position:'relative', wordWrap:'break-word', wordBreak:'keep-all'}}>팀빌딩에서의 만남을 평생의 인연으로</div>
        </div>
      </div>
    </div>
  )
}
