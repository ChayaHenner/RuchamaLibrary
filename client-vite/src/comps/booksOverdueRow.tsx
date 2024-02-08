import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React from 'react'
import { Typography } from '@mui/material'
import { RowProps } from '../utils/types'
import { FC } from 'react'
import { overduestyle } from '../styles/overdue.style'

export const Row: FC<RowProps> = ({ row }) => {
  const [open, setOpen] = React.useState(false)
console.log(row);

  return (
    <>
      <TableRow sx={overduestyle.tablerow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.reader_name}{' '}
        </TableCell>
        <TableCell>{row.reader_id}</TableCell>
        <TableCell>{row.reader_email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={overduestyle.box}>
              <Typography variant="h5" gutterBottom component="div">
                books
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>book id</TableCell>
                    <TableCell>book name</TableCell>
                    <TableCell>author</TableCell>
                    <TableCell>Date Borrowed</TableCell>
                    <TableCell>borrowing #</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.unreturned_books.map((book: any) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.book}</TableCell>
                      <TableCell>{book.book_instance.name}</TableCell>
                      <TableCell>{book.book_instance.author}</TableCell>
                      <TableCell component="th" scope="row">
                        {' '}
                        {book.dateBorrowed.split('T')[0]} ---{' '}
                        {book.dateBorrowed.split('T')[1].split('.')[0]}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {book.borrowing_id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
