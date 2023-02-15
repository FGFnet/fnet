import React, { useState } from 'react'
import { Container, Grid, Box, Button, Divider } from '@mui/material'
import { Header, Title, MenuButton, AdminTable, Loading } from '../../component'

const data = [
  {
    name: '김일건',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건1',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 's',
    register: true,
  },
  {
    name: '김일건2',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'h',
    register: true,
  },
  {
    name: '김일건3',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'e',
    register: true,
  },
  {
    name: '김일건4',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건5',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건6',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건7',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건8',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건9',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
  {
    name: '김일건10',
    phone_number: '010-1234-5678',
    lc: 'LC08',
    department: 'n',
    register: true,
  },
]

export default function FgSettingScreen() {
  const [tableData, updateTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const tableColumn = [
    { id: 'index', label: '#' },
    { id: 'name', label: '이름' },
    { id: 'phone_number', label: '전화번호' },
    { id: 'lc', label: 'LC' },
    { id: 'department', label: '계열' },
    { id: 'register', label: '등록' },
  ]

  // api 작동 확인 필요
  /*
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await api.getFreshmanList()
      updateTableData(res.data.data)
    } catch (err) {
      alert(err)
      setLoading(false)
    }
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
        const res = await api.uploadFreshman(formData);
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
          <Title title="신입생 명단" variant="h5" background="#D0DBCC" />
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
