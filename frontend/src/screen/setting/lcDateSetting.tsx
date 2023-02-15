import React, { useState } from 'react'
import { Container, Grid, Box, Button, Divider } from '@mui/material'
import { Header, Title, MenuButton, AdminTable, Loading } from '../../component'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'
import { LCService, ScheduleService, UserService } from '../../service'
import { useMutation, useQuery } from 'react-query'
import { Schedule } from '../../model'
import dayjs from 'dayjs'

type LCTableData = {
  lc: string
  schedule: string | number
  fg_n: string
  fg_s: string
}

const tableColumn = [
  { id: 'lc', label: 'LC' },
  { id: 'schedule', label: '팀빌딩 날짜' },
  { id: 'fg_n', label: '자연과학 FG' },
  { id: 'fg_s', label: '인문사회 FG' },
]

export default function LcDateSettingScreen() {
  const [loading, setLoading] = useState(false)
  const [scheduleList, setScheduleList] = useState<Schedule[]>([])
  const token = useRecoilValue(accesstoken)
  
  const schedule = useQuery('getSchedule', async () => await ScheduleService.get(token), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data) {
        setScheduleList(data.data)
      }
    },
  })
  const lc = useQuery('getLC', 
    async () => await LCService.get(token), { 
      refetchOnWindowFocus: false,
      enabled: !schedule.isLoading
    })

  const getDate = (day: number) => {
    let date = '-'
    if (scheduleList.length > 0) {
      const schedule = scheduleList.find((s) => s.day === day)
      date = dayjs(schedule?.date).format('YYYY-MM-DD')
      return date
    } else {
      alert('팀빌딩 날짜를 설정해주세요')
      return '-'
    }
  }

  const setLCData = () => {
    const lclist: LCTableData[] = []
    if (lc.data && scheduleList.length > 0) {
      lc.data.data.map((item: any) => {
        lclist.push({
          lc: item.name,
          fg_n: item.fg_n_id.name,
          fg_s: item.fg_s_id.name,
          schedule: getDate(item.schedule),
        })
      })
    }
    return lclist
  }

  const uploadFGFileMutate = useMutation(
    'uploadFgFile',
    async (param: any) => await UserService.post(param.file, token),
    {
      onSuccess: () => {
        setLoading(false)
        lc.refetch()
      },
    },
  )

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files != null) {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      event.target.value = ''
      uploadFGFileMutate.mutate({ file: formData })
    } else {
      alert('파일이 선택되지 않았습니다.')
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="설정" children={<MenuButton />} />
        <Grid mt={1} mb={1}>
          <Title title="LC 팀빌딩 날짜" variant="h5" background="#D0DBCC" />
          <Box component="span" sx={{ float: 'right' }}>
            <Button variant="outlined" component="label">
              Upload File
              <input type="file" accept=".xlsx, .xls" hidden onChange={uploadFile} />
            </Button>
          </Box>
        </Grid>
        <Divider />
        <Grid container mt={1} mb={1}>
          {(loading || lc.isLoading) && <Loading />}
          {!loading && !lc.isLoading && lc.data && <AdminTable header={tableColumn} data={setLCData()} />}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
