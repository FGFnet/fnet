import React, { useState } from 'react'
import { Container, Grid, Box, Button, Divider } from '@mui/material'
import { Header, Title, MenuButton, AdminTable, Loading } from '../../component'
import { useQuery } from 'react-query'
import { getFreshman } from '../../service'

export default function FgSettingScreen() {
  const [freshmanData, setFreshmanData] = useState([])
  const [loading, setLoading] = useState(true)

  const tableColumn = [
    { id: 'index', label: '#' },
    { id: 'name', label: '이름' },
    { id: 'phone_number', label: '전화번호 (뒷자리)' },
    { id: 'lc', label: 'LC' },
    { id: 'register', label: '등록' },
  ]

  useQuery('freshmans', getFreshman, {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setFreshmanData(data.data)
      setLoading(false)
    },
    onError: error => {
      console.log(error)
    },
  })
    
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
          {loading ? <Loading /> : <AdminTable header={tableColumn} data={freshmanData} />}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
