import React, { useState } from 'react'
import { Container, Grid, Box, Button, Divider } from '@mui/material'
import { Header, Title, MenuButton, AdminTable, Loading } from '../../component'

const data = [
  {
    name: '김일건',
    student_id: '2018123456',
    role: 1,
    lc_onDuty_1: 'LC99',
    lc_onDuty_2: 'LC100',
    lc_onDuty_3: 'LC08',
    campus: 'n',
  },
  {
    name: '김이건',
    student_id: '2018123456',
    role: 2,
    lc_onDuty_1: 'LC99',
    lc_onDuty_2: 'LC100',
    lc_onDuty_3: 'LC08',
    campus: 'n',
  },
  {
    name: '김삼건',
    student_id: '2018123456',
    role: 0,
    lc_onDuty_1: 'LC99',
    lc_onDuty_2: '',
    lc_onDuty_3: 'LC08',
    campus: 's',
  },
]

export default function FgSettingScreen() {
  const [tableData, updateTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const tableColumn = [
    { id: 'index', label: '#' },
    { id: 'name', label: '이름' },
    { id: 'student_id', label: '학번' },
    { id: 'role', label: '구분' },
    { id: 'lc_onDuty_1', label: 'DAY1' },
    { id: 'lc_onDuty_2', label: 'DAY2' },
    { id: 'lc_onDuty_3', label: 'DAY3' },
    { id: 'campus', label: '캠퍼스' },
  ]

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
      /*
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      try {
        const res = await api.uploadFGFile(formData);
        if (!res.data.error) {
          alert('Upload Successful');
          setSingleFile(null)
          await fetchUsers()
        }
      } catch (err) {
        alert(err)
      } finally{

      }
      */
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
          <Title title="FG 명단" variant="h5" background="#D0DBCC" />
          <Box component="span" sx={{ float: 'right' }}>
            <Button variant="outlined" component="label">
              Upload File
              <input type="file" accept=".xlsx, .xls" hidden onChange={uploadFile} />
            </Button>
          </Box>
        </Grid>
        <Divider />
        <Grid container mt={1} mb={1}>
          {loading ? <Loading /> : <AdminTable header={tableColumn} data={data} />}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
