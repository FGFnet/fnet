import {RoundedButton} from './roundedButton'
import { Colors } from '../../constant'
import { useNavigate } from 'react-router-dom'

export type LcSectionProp = {
  id: number;
  fg_n: string;
  fg_s: string;
  name: string;
  total: number;
  schedule: string;
}

export default function ScheduleSection({lc}:{lc:LcSectionProp}) {
  const navigate = useNavigate()

  const lcTextStyle = {
    backgroundColor: Colors.primary_lighter,
    display: 'inline-block',
    marginLeft: 30,
  }

  return (
    <section style={{ margin: 30 }}>
      <RoundedButton text={lc.name} onClick={() => {navigate(`/lc/${lc.id}`)}} />
      <div style={lcTextStyle}>{lc.schedule}</div>
      <div
        style={{ textAlign: 'left', marginLeft: 20, fontSize: 14, display: 'inline-block', verticalAlign: 'middle' }}
      >
        담당 FG : {lc.fg_n + ', ' + lc.fg_s} <br />
        전체인원 : {lc.total}
      </div>
    </section>
  )
}

export {ScheduleSection};