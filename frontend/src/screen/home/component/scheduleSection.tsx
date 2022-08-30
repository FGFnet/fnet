import RoundedButton from './roundedButton'
import { useEffect, useState } from 'react'
import { Colors } from '../../../constant'

type scheduleProp = {
    date:string,
    lc?: number
}

export default function ScheduleSection(props: scheduleProp) {
  const lcTextStyle = {
    backgroundColor: Colors.primary_lighter,
    display: 'inline-block',
    marginLeft: 30
  }

  const [lcName, setLcName] = useState('')

  useEffect (()=>{
    setLC(props.lc)
  },);

  const setLC = (lc?: number) => {
    if (!lc) setLcName('-')
    else if (lc < 10) setLcName('0'+lc)
    else setLcName(lc+'')
  }

  return (
    <section style={{margin: 30}}>
      <RoundedButton text={props.date}/>
      <div style={lcTextStyle}>LC {lcName}</div>
      { lcName === '-' && <div style={{textAlign:'left',
        marginLeft:20,
        fontSize: 14,
        display: 'inline-block',
        verticalAlign: 'middle'}}>해당 날짜에 배정된 LC가 없습니다</div> }
      { lcName !== '-' &&
        <div style={{textAlign:'left',
        marginLeft:20,
        fontSize: 14,
        display: 'inline-block',
        verticalAlign: 'middle'}}>
          담당 FG : 하솔비 fg, 정노원 fg <br/>
          전체인원 : 20
        </div>
      }
    </section>
  )
}
