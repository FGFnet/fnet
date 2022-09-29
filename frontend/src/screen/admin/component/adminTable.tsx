import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
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

export default function AdminTable({ header, data }: AdminTableType) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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
                      } else if (column.id === 'campus')
                        return <CustomTableCell>{value === 'n' ? '자연과학' : '인문사회'}</CustomTableCell>
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
