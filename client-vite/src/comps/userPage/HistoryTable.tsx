import {useState,FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Pagination } from '@mui/material';
import { HistoryTableProps } from '../../utils/types';

export const HistoryTable: FC<HistoryTableProps> = ({ history }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const sortedHistory=history.sort((a, b) => new Date(b.dateReturned).getTime() - new Date(a.dateReturned).getTime());
  const paginatedHistory = sortedHistory.slice((page-1) * rowsPerPage, (page) * rowsPerPage);
console.log(paginatedHistory);


  return (
    <Grid  component={Paper}>
      <TableContainer>
        <Table >
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
                <TableCell align="left">{row.book.bookCode.bookCode}</TableCell>
                <TableCell>{row.book.bookCode.name}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {row.dateBorrowed ? new Date(row.dateBorrowed).toLocaleString('en-UK', { weekday: 'short', year: 'numeric', month: '2-digit', day: 'numeric', hour: 'numeric', minute: 'numeric'}) : ''}
                </TableCell>
                <TableCell>
                  {row.dateReturned ? new Date(row.dateReturned).toLocaleString('en-UK', { weekday: 'short', year: 'numeric', month: '2-digit', day: 'numeric', hour: 'numeric', minute: 'numeric'}) : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(sortedHistory.length / rowsPerPage)}
        page={page}
        onChange={(_,newPage)=>{ console.log(newPage);
         setPage(newPage)}}
      />
    </Grid>
  );
};
