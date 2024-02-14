import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react'
import { getOverdueReaders } from '../../api/borrowing'
import { Row } from './BooksOverdueRow'

export default function CollapsibleTable() {
  const [readers, setReaders] = useState<any[]>([])

  useEffect(() => {
    const fetchReaders = async () => {
     
        setReaders(await getOverdueReaders())
    
    }
    fetchReaders()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>name</TableCell>
            <TableCell>id</TableCell>
            <TableCell>email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {readers.map((reader) => (
            <Row key={reader.reader_id} row={reader} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
