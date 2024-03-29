import { useState, FC } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Grid, Pagination, Typography } from '@mui/material'
import { HistoryTableProps } from '../../utils/types'
import { text } from './userPage.style'

export const HistoryTable: FC<HistoryTableProps> = ({ history }) => {
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const sortedHistory = history.sort(
    (a, b) =>
      new Date(b.dateReturned).getTime() - new Date(a.dateReturned).getTime(),
  )
  const paginatedHistory = sortedHistory.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  )
  console.log(paginatedHistory)

  return (
    <Grid>
      <Typography variant="h3" sx={text}>
        Books History
      </Typography>
      {history.length > 0 ? (
        <Grid component={Paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>book id</TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Borrowing Id</TableCell>
                  <TableCell>Date Borrowed</TableCell>
                  <TableCell>Date Returned</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">
                      {row.book.bookCode.bookCode}
                    </TableCell>
                    <TableCell>{row.book.bookCode.name}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      {new Date(row.dateBorrowed).toLocaleString('en-UK', {
                        weekday: 'short',
                        year: 'numeric',
                        month: '2-digit',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(row.dateReturned).toLocaleString('en-UK', {
                        weekday: 'short',
                        year: 'numeric',
                        month: '2-digit',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(sortedHistory.length / rowsPerPage)}
            page={page}
            onChange={(_, newPage) => {
              setPage(newPage)
            }}
          />
        </Grid>
      ) : (
        <Typography>none</Typography>
      )}
    </Grid>
  )
}
