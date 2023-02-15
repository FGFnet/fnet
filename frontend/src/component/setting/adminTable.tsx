import * as React from 'react'
import {
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableCellProps, 
  TableContainer,
  TableHead, 
  TablePagination, 
  TableRow
} from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomTableCell = styled(TableCell)<TableCellProps>({
  wordBreak: 'keep-all',
})

type headerType = {
  id: string
  label: string
}

type AdminTableType = {
  header: headerType[]
  data: any
}

type rowType = {
  [key: string]: number | string
}

function AdminTable({ header, data }: AdminTableType) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const setDepartment = (dep: string | number) => {
    switch (dep){
      case 'n':
        return '자연과학'
      case 'e':
        return '공학'
      case 's':
        return '사회과학'
      case 'h':
        return '인문사회'
      default:
        return '-'
    }
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              {header.map((h) => (
                <CustomTableCell key={h.id}> {h.label} </CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: rowType, idx: number) => {
              const rowId: number = page * rowsPerPage + idx + 1
              return (
                <TableRow hover role="checkbox" key={rowId}>
                  {header.map((column) => {
                    if (column.id === 'index') {
                      return <CustomTableCell> {rowId}</CustomTableCell>
                    } else {
                      const value = row[column.id]
                      if (column.id === 'role') {
                        if (value === 0) return <CustomTableCell>운영진</CustomTableCell>
                        if (value === 1) return <CustomTableCell>운영기수</CustomTableCell>
                        if (value === 2) return <CustomTableCell>활동기수</CustomTableCell>
                      } else if (column.id === 'department')
                        return <CustomTableCell>{setDepartment(value)}</CustomTableCell>
                      else if (column.id === 'DAY1' || 'DAY2' || 'DAY3')
                        return <CustomTableCell>{value === '' ? '-' : value}</CustomTableCell>
                      else if (column.id === 'register') return <CustomTableCell>{value ? 'O' : 'X'}</CustomTableCell>
                      else return <CustomTableCell sx={{ wordBreak: 'keep-all' }}>{String(value)}</CustomTableCell>
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export {AdminTable};
