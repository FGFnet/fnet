import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

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
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((h) => (
                <TableCell key={h.id}> {h.label} </TableCell>
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
                      return <TableCell> {rowId}</TableCell>
                    } else {
                      const value = row[column.id]
                      if (column.id === 'role') {
                        if (value === 0) return <TableCell>운영진</TableCell>
                        if (value === 1) return <TableCell>운영기수</TableCell>
                        if (value === 2) return <TableCell>활동기수</TableCell>
                      } else if (column.id === 'campus')
                        return <TableCell>{value === 'n' ? '자연과학' : '인문사회'}</TableCell>
                      else return <TableCell>{String(value)}</TableCell>
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
