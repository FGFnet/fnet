import React, { useState } from 'react'
import { Container, Grid, Box, Button, Divider } from '@mui/material'
import { MenuButton, AdminTable, Loading } from './component'
import { Header, Title } from '../../component'
import { cleanupOutdatedCaches } from 'workbox-precaching'

const data = [
  {
    lc: 'LC01',
    building_date: 1671462000000,
    fg_n: '나는자과',
    fg_s: '난인사',
  },
  {
    lc: 'LC02',
    building_date: 1671548400000,
    fg_n: '난자과',
    fg_s: '난안사',
  },
  {
    lc: 'LC03',
    building_date: 1671548400000,
    fg_n: '난자과2',
    fg_s: '난안사2',
  },
  {
    lc: 'LC10',
    building_date: 1671548400000,
    fg_n: '난과자',
    fg_s: '난안',
  },
  {
    lc: 'LC100',
    building_date: 1671548400000,
    fg_n: '난과자2',
    fg_s: '난감자',
  },
]

type dataType = {
  lc: string
  building_date: string | number
  fg_n: string
  fg_s: string
}

export default function LcDateSettingScreen() {
  const [tableData, updateTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const dayStr = ['일', '월', '화', '수', '목', '금', '토']

  const tableColumn = [
    { id: 'lc', label: 'LC' },
    { id: 'building_date', label: '팀빌딩 날짜' },
    { id: 'fg_n', label: '자연과학 FG' },
    { id: 'fg_s', label: '인문사회 FG' },
  ]

  const formatData = data.map((e) => {
    let temp: dataType = Object.assign({}, e)

    const target_date = new Date(temp.building_date)
    temp.building_date = `${target_date.getFullYear()}/${target_date.getMonth() + 1}/${target_date.getDate()} (${
      dayStr[target_date.getDay()]
    })`
    return temp
  })

  // api 확인 필요
  /*
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await api.getFGList()
      updateTableData(res.data.data)
    } catch (err) {
      alert(err)
    }
    setLoading(false)
  }
  */

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setLoading(true)
      // api 작동 확인 필요
      setTimeout(() => {
        setLoading(false)
      }, 500)
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
          {loading ? <Loading /> : <AdminTable header={tableColumn} data={formatData} />}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
