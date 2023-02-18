import {RoundedButton} from './roundedButton'
import { Colors } from '../../constant'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../service';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { accesstoken, userState } from '../../store';

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
  const token = useRecoilValue(accesstoken)
  const user = useRecoilValue(userState)
  const lcCount = useQuery('getMyLCCount', async () => await UserService.getLCMemberCount(String(lc.name), token), {
    enabled: user!== null,
    // onSuccess: (data) => {
    //   console.log(data)
    // },
  })

  const lcTextStyle = {
    backgroundColor: Colors.primary_lighter,
    display: 'inline-block',
    marginLeft: 30,
  }

  return (
    <section style={{ margin: 30 }}>
      <RoundedButton text={lc.name} onClick={() => {navigate(`/lc/${lc.name}`)}} />
      <div style={lcTextStyle}>{lc.schedule}</div>
      {!lcCount.isLoading &&
         <div
          style={{ textAlign: 'left', marginLeft: 20, fontSize: 14, display: 'inline-block', verticalAlign: 'middle' }}
        >
          담당 FG : {lc.fg_n + ', ' + lc.fg_s} <br />
          전체인원 : {lcCount.data.data.total}
        </div>
      }
    </section>
  )
}

export {ScheduleSection};