import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HistoryTableProps } from '../utils/types';

export  const HistoryTable:React.FC<HistoryTableProps>=({ history })=> {
  console.log(history);
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >book id</TableCell>
            <TableCell >Book Name</TableCell>
            <TableCell >Borrowing Id</TableCell>
            <TableCell >Date Borrowed</TableCell>
            <TableCell >Date Returned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {history?.map((row) => (
            <TableRow
              key={row.borrowing_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell >{row.id}</TableCell>
              <TableCell align="left">{row.book_instance.book_name}</TableCell>
              <TableCell >{row.borrowing_id}</TableCell>
              <TableCell >{row.date_borrowed.split('T')[0]}-{row.date_borrowed.split('T')[1].split('.')[0]}</TableCell>
              <TableCell >{row?.date_returned?.split('T')[0]}-{row?.date_returned?.split('T')[1].split('.')[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
