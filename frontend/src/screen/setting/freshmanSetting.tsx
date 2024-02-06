import React, { useState } from 'react'
import { Container, Grid, Box, Button, Divider } from '@mui/material'
import { Header, Title, MenuButton, AdminTable, Loading } from '../../component'
import { useMutation, useQuery } from 'react-query'
import { UserService } from '../../service'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'

export default function FgSettingScreen() {
  const [freshmanData, setFreshmanData] = useState([])
  const [loading, setLoading] = useState(true)
  const token = useRecoilValue(accesstoken)

  const tableColumn = [
    { id: 'index', label: '#' },
    { id: 'name', label: '이름' },
    { id: 'phone_number', label: '전화번호 (뒷자리)' },
    { id: 'lc', label: 'LC' },
    { id: 'department', label: '계열' },
    { id: 'register', label: '등록' },
  ]

  useQuery(['freshmans', token], () => UserService.getFreshman(token), {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setFreshmanData(data.data)
      setLoading(false)
    },
    onError: error => {
      console.log(error)
    },
  })


  const uploadFileMutate = useMutation((param: any) => UserService.upLoadFreshman(param.file, param.token))

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files != null) {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      event.target.value = ''

      uploadFileMutate.mutate({file: formData, token: token}, {
        onSuccess: data => {
          if (data.error) {
            alert(data.data)
            return
          }
          setLoading(false)
          setFreshmanData(data.data)
          // console.log(freshmanData)
        }
        // onError: error => {
        //   alert(error)
        //   setLoading(false)
        // },
      })
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
