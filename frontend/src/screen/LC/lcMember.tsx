import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {Header, LCStatus, Loading} from '../../component'
import { UserService } from '../../service'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'

const TableCellTheme = createTheme({
  components: {
    MuiTableCell: {
      defaultProps: {
        align: 'center',
      },
      styleOverrides: {
        root: {
          padding: '6px 8px',
        },
      },
    },
  },
})

interface lcMemberDataInterface {
  name: string
  lc: string
  department: string
  register: string
}

export default function LcMemberScreen() {
  let { id } = useParams()
  const [lcData, setlcData] = useState<lcMemberDataInterface[]>([])
  const [loading, setLoading] = useState(true)
  const token = useRecoilValue(accesstoken)
  
  useQuery(['lcMember', id], () => UserService.getLcMemberList(id as string, token), {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      if (data.error) {
        alert(data.data)
        return
      }
      setlcData(data.data)
      setLoading(false)
    },
  })

  let sRegister = 0
  let nRegister = 0
  let eRegister = 0
  let hRegister = 0

  lcData.forEach((member) => {
    if (member.register === 'O') {
      if (member.department === '자연과학') nRegister++
      else if (member.department === '공학') eRegister++
      else if (member.department === '인문사회') sRegister++
      else if (member.department === '사회과학') hRegister++
    }
  })

  const LCMemberTable = () => {
    return (
      <TableContainer>
        <ThemeProvider theme={TableCellTheme}>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                typography: { xs: 'body2', sm: 'body1' },
              },
              whiteSpace: 'noWrap',
            }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>계열</TableCell>
                <TableCell>접수 여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lcData.map((r, i) => (
                <TableRow hover={true} sx={{ '& td': { border: 0 } }}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.department}</TableCell>
                  <TableCell>{r.register}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ThemeProvider>
      </TableContainer>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title={'접수 현황'} />
        <Grid container justifyContent="space-between" width="100%">
          <Grid item xs={12} sm={3} md={5}>
            <LCStatus lc={lcData[0]?.lc} sReg={sRegister} nReg={nRegister} eReg={eRegister} hReg={hRegister} />
            <Divider />
          </Grid>
          <Grid item xs={12} sm={8} md={7}>
            {loading ? <Loading /> : <LCMemberTable />}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
