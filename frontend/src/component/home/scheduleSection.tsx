import {RoundedButton} from './roundedButton'
import { Colors } from '../../constant'
import { useNavigate } from 'react-router-dom'

type lc = {
  fg_n: string;
  fg_s: string;
  name: string;
  date: string;
  total: number;
}

export default function ScheduleSection({props}: {props:lc}) {
  const navigate = useNavigate()
  const getLCNum = () => {
    return Number(props.name.slice(2))
  }

  const lcTextStyle = {
    backgroundColor: Colors.primary_lighter,
    display: 'inline-block',
    marginLeft: 30,
  }

  return (
    <section style={{ margin: 30 }}>
      <RoundedButton text={props.name} onClick={() => navigate(`/lc/${getLCNum()}`)} />
      <div style={lcTextStyle}>{props.date}</div>
      <div
        style={{ textAlign: 'left', marginLeft: 20, fontSize: 14, display: 'inline-block', verticalAlign: 'middle' }}
      >
        담당 FG : {props.fg_n + ', ' + props.fg_s} <br />
        전체인원 : {props.total}
      </div>
      {/* {lcName === '-' && (
        <div
          style={{ textAlign: 'left', marginLeft: 20, fontSize: 14, display: 'inline-block', verticalAlign: 'middle' }}
        >
          해당 날짜에 배정된 LC가 없습니다
        </div>
      )}
      {lcName !== '-' && (
        <div
          style={{ textAlign: 'left', marginLeft: 20, fontSize: 14, display: 'inline-block', verticalAlign: 'middle' }}
        >
          담당 FG : 하솔비 fg, 정노원 fg <br />
          전체인원 : 20
        </div>
      )} */}
    </section>
  )
}

export {ScheduleSection};