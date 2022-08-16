import {
  Box,
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
  type RegisterDetailType = {
    campus: string
    department: number
  }

  let totalRegister = 0
  let sRegister = 0
  let nRegister = 0
  let eRegister = 0
  let hRegister = 0

  data.forEach((member) => {
    if (member.register) {
      totalRegister++
      if (member.department === 'n') nRegister++
      if (member.department === 'e') eRegister++
      if (member.department === 's') sRegister++
      if (member.department === 'h') hRegister++
    }
  })

  const DepartmentName = (department: string) => {
    if (department === 'n') return '자연과학'
    if (department === 'e') return '공학'
    if (department === 'h') return '인문사회'
    if (department === 's') return '사회과학'
    return '-'
  }

  const RegisterDetail = ({ campus, department }: RegisterDetailType) => {
    return (
      <Grid container item>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          {campus}
        </Typography>
        <Typography component="div" textAlign="right">
          {department}
        </Typography>
      </Grid>
    )
  }

  const RegisterStatus = () => {
    return (
      <Grid container xs={5} sm="auto" md={5} rowSpacing={1}>
        <Grid container item>
          <Typography component="div" fontWeight="bolder" sx={{ flexGrow: 1 }}>
            전체 접수 인원
          </Typography>
          <Typography component="div" textAlign="right">
            {totalRegister}
          </Typography>
        </Grid>
        <RegisterDetail campus={'인사캠 접수 인원'} department={hRegister + sRegister} />
        <RegisterDetail campus={'자과캠 접수 인원'} department={eRegister + nRegister} />
      </Grid>
    )
  }

  const LCStatus = () => {
    return (
      <React.Fragment>
        <Stack
          direction={{ xs: 'row', sm: 'column', md: 'row' }}
          justifyContent="space-evenly"
          alignItems="center"
          marginY={3}
          spacing={3}
        >
          <Grid
            minWidth="130px"
            xs={3}
            sm="auto"
            md={3}
            textAlign="center"
            height="110px"
            display="flex"
            sx={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Typography component="div" variant="h4" fontWeight="bolder" textAlign="center" margin="auto">
              LC09
            </Typography>
          </Grid>
          <RegisterStatus />
        </Stack>
      </React.Fragment>
    )
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
            <LCStatus />
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
