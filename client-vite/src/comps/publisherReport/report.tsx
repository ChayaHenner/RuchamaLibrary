import { useEffect, useState } from 'react'
import { getReport, patchDeletePublisher } from '../../api/publisher'
import { PublisherReport } from '../../utils/types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from '@mui/material'
import { TableContainersx, button } from './report.style'
import * as XLSX from 'xlsx'
// @ts-ignore
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2'

const Report = () => {
  const [data, setData] = useState<PublisherReport[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setData(await getReport())
    }

    fetchData()
  }, [])

  const downloadEXEL = () => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Publisher Report')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(file, 'publisher_report.xlsx')
  }

const deletePublisher=(id:number)=>{
console.log(id);
Swal.fire({
  title: ' Are you sure?',
  text: `You want to delete publisher`,
  icon: 'question',
  confirmButtonText: 'confirm',
}).then(async (result) => {
  if (result.isConfirmed) {
    try {
      await patchDeletePublisher(id);
      Swal.fire({
        title: 'Deleted!',
        text: 'publisher no longer exists',
        icon: 'success',
        confirmButtonText: 'confirm',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();

        }
      });
    } catch {
      Swal.fire({
        title: 'Can\'t Delete',
        text: 'publisher has books in library',
        icon: 'warning',
      });
    }
  }
});
}
  return (
  <Grid >

      <Button sx={button} onClick={downloadEXEL} variant='contained'>
        export exel
      </Button>
    <TableContainer  sx={TableContainersx}>

      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Publisher ID</TableCell>
            <TableCell>Publisher Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Book Count</TableCell>
            <TableCell>Publisher Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.country}</TableCell>
              <TableCell>{report.bookcount}</TableCell>
              <TableCell>{report.publisherprice}</TableCell>
              <TableCell><Button onClick={()=>{deletePublisher(report.id)}}>delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></Grid>

  )
}

export default Report
