import React, { useState } from 'react'
import { Header, Loading } from '../../component'
import {
  TextField,
  Checkbox,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { Container } from '@mui/system'
import { useMutation, useQuery } from 'react-query'
import { getFreshman, registerFreshman } from '../../service'

interface registerData {
  id: number
  name: string
  phone_number: number
  lc: string
  register: boolean
}

// const originalRows: registerData[] = [
//   { id: 1, name: '박민서', phone_number: 1243, lc: 'LC23', register: true },
//   { id: 2, name: '이승준', phone_number: 5213, lc: 'LC21', register: true },
//   { id: 3, name: '정노원', phone_number: 2567, lc: 'LC96', register: false },
//   { id: 4, name: '심지연', phone_number: 3426, lc: 'LC43', register: true },
//   { id: 5, name: '장선영', phone_number: 8245, lc: 'LC63', register: false },
//   { id: 6, name: '이창준', phone_number: 1238, lc: 'LC78', register: true },
//   { id: 7, name: '배성빈', phone_number: 1263, lc: 'LC12', register: false },
// ]

export default function RegisterScreen() {
  const [loading, setLoading] = useState(true)
  const [originalRows, setOriginalRows] = useState<registerData[]>([])
  const [rows, setRows] = useState<registerData[]>([])
  const [searched, setSearched] = useState<string>('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  useQuery('registerFreshmans', getFreshman, {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setOriginalRows(data.data)
      setRows(data.data)
      setLoading(false)
    },
    onError: error => {
      console.log(error)
    },
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const requestSearch = (SearchVal: string) => {
    setSearched(SearchVal)
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(SearchVal.toLowerCase())
    })
    setRows(filteredRows)
  }

  const registerMutate = useMutation(registerFreshman)
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedRows = rows.map((data) => {
      if (data.id === id) {
        registerMutate.mutate(id, {
          onSuccess: data =>{
            // alert('반영되었습니다.')
          },
          onError: error => {
            alert('잠시 후 다시 시도해주세요')
            setLoading(true)
          },
        })
        return { ...data, register: event.target.checked }
      }
      return data
    })
    setRows(updatedRows)
  }

  return (
    <Container maxWidth="lg">
      <Header title="접수" />
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <TextField
          sx={{ marginRight: 2 }}
          id="standard-basic"
          label="이름"
          value={searched}
          onChange={(event) => requestSearch(event.target.value)}
        ></TextField>
      </Box>
      {loading ? <Loading /> :
        <Box>
        <TableContainer component={Container}>
          <Table aria-label="dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">이름</TableCell>
                <TableCell align="center">전화번호</TableCell>
                <TableCell align="center">LC</TableCell>
                <TableCell align="center">접수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.phone_number}</TableCell>
                  <TableCell align="center">{row.lc}</TableCell>
                  <TableCell align="center">
                    {
                      <Checkbox
                        checked={row.register}
                        onChange={(event) => handleCheckBox(event, row.id)}
                        icon={<BsSuitHeart />}
                        checkedIcon={<BsSuitHeartFill />}
                      />
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    }
    </Container>
  )
}
