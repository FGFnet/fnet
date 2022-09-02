import {
  Container,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import background from '../../image/lc_bgImg.png'
import Header from '../../component/Header'
import LCStatus from './component/lcStatus'

export default function LcMemberScreen() {
  const data = [
    { name: 'kim ilgun', department: 'n', register: true },
    { name: '박민서', department: 'n', register: true },
    { name: '박민서', department: 'n', register: true },
    { name: '박민서', department: 'n', register: true },
    { name: '박민서', department: 'n', register: true },
    { name: '정노원', department: 'n', register: false },
    { name: '정노원', department: 'n', register: false },
    { name: '정노원', department: 'n', register: false },
    { name: '정노원', department: 'n', register: false },
    { name: '정노원', department: 'n', register: false },
    { name: '정노원', department: 'n', register: false },
    { name: '김일건', department: 'e', register: false },
    { name: '한새로오름', department: 's', register: true },
    { name: '김일건', department: 'h', register: true },
    { name: '김일건', department: 'n', register: true },
    { name: '정노원', department: 'n', register: true },
    { name: '김일건', department: 'e', register: true },
    { name: '한새로오름', department: 's', register: false },
    { name: '김일건', department: 'h', register: false },
    { name: '김일건', department: 'n', register: false },
  ]

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

  let sRegister = 0
  let nRegister = 0
  let eRegister = 0
  let hRegister = 0

  data.forEach((member) => {
    if (member.register) {
      if (member.department === 'n') nRegister++
      else if (member.department === 'e') eRegister++
      else if (member.department === 's') sRegister++
      else if (member.department === 'h') hRegister++
    }
  })

  const DepartmentName = (department: string) => {
    if (department === 'n') return '자연과학'
    else if (department === 'e') return '공학'
    else if (department === 'h') return '인문사회'
    else if (department === 's') return '사회과학'
    return '-'
  }

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
              {data.map((r, i) => (
                <TableRow hover={true} sx={{ '& td': { border: 0 } }}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{DepartmentName(r.department)}</TableCell>
                  <TableCell>{r.register ? 'O' : 'X'}</TableCell>
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
            <LCStatus sReg={sRegister} nReg={nRegister} eReg={eRegister} hReg={hRegister} />
            <Divider />
          </Grid>
          <Grid item xs={12} sm={8} md={7}>
            <LCMemberTable />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
