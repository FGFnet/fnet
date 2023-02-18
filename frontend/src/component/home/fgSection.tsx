import { Button, Box } from '@mui/material'
import dayjs from 'dayjs'
import { FiArrowRight } from 'react-icons/fi'
import { TbMoodSmile } from 'react-icons/tb'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Colors } from '../../constant'
import { FG } from '../../model'
import { LCService, UserService } from '../../service'
import { accesstoken, userState } from '../../store'

function FGSection({ fg }: { fg: FG | null }) {
  const navigate = useNavigate()
  const token = useRecoilValue(accesstoken)
  const user = useRecoilValue(userState)
  const getToday = () => {
    return dayjs().format('M월 DD일')
  }
  const todayLC = useQuery('getTodayLC', async () => await LCService.getTodayLC(token), {
    refetchOnWindowFocus: false,
    enabled: fg !== null,
  })
  const lcCount = useQuery('getMyLCCountregister', async () => await UserService.getLCMemberCount(String(todayLC.data.data.id), token), {
    enabled: user!== null && !todayLC.isLoading && todayLC.data && todayLC.data.data !== null && todayLC.data.data.length > 0,
    onSuccess: (data) =>  {
      console.log(data)
    }
  })
  return (
    <section style={{ margin: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        Hello <TbMoodSmile fontSize={20} />
      </div>
      {fg !== null && (
        <>
          <span style={{ fontSize: 20, background: Colors.accent }}>{fg.name} fg</span>
          {!todayLC.isLoading && todayLC.data && todayLC.data.data !== null && todayLC.data?.data.length > 0 &&
           todayLC.data.data.map((item:any) => (
            <Box key={item.id}>
              <div style={{ marginBottom: 5, marginTop: 20 }}>
                {getToday()} 진행 LC : {item.name}
              </div>
              {!lcCount.isLoading &&
                <div style={{ marginBottom: 20 }}>{todayLC.data.data.name} 접수 인원 : {lcCount.data.register}</div>
              }
              <Button variant="outlined" style={{ margin: 'auto' }} onClick={() => navigate(`/lc/${item.id}`)}>
                Go {item.name} <FiArrowRight />
              </Button>
            </Box>
          ))}
        </>
      )}
      {fg === null && <div>로그인이 필요합니다.</div>}
    </section>
  )
}

export { FGSection }
