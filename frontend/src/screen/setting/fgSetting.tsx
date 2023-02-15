import React from 'react'
import { Container, Grid, Divider } from '@mui/material'
import { Header, Title, MenuButton, AdminTable, Loading } from '../../component'
import { useQuery } from 'react-query'
import { UserService } from '../../service'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'

export default function FgSettingScreen() {
  const token = useRecoilValue(accesstoken)
  const getFg = useQuery('getAllFg', async () => await UserService.getAll(token), {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const tableColumn = [
    { id: 'index', label: '#' },
    { id: 'name', label: '이름' },
    { id: 'student_id', label: '학번' },
    { id: 'role', label: '구분' },
    { id: 'campus', label: '캠퍼스' },
  ]

  return (
    <Container maxWidth="lg">
      <Header title="설정" children={<MenuButton />} />
      <Grid mt={1} mb={1}>
        <Title title="FG 명단" variant="h5" background="#D0DBCC" />
      </Grid>
      <Divider />
      {getFg.isLoading && (<Loading />)}
      {!getFg.isLoading && getFg.data &&(
        <Grid container mt={1} mb={1}>
          <AdminTable header={tableColumn} data={getFg.data.data} />
        </Grid>)
      }
    </Container>
  )
}
