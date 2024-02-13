import { useEffect, useState } from 'react'
import { getReport } from '../../api/publisher'
import { PublisherReport } from '../../utils/types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import { button } from './report.style'
import * as XLSX from 'xlsx'
// @ts-ignore
import { saveAs } from 'file-saver'

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

  return (
    <TableContainer>
      <Button sx={button} onClick={downloadEXEL}>
        export exel{' '}
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Publisher ID</TableCell>
            <TableCell>Publisher Name</TableCell>
            <TableCell>Book Count</TableCell>
            <TableCell>Publisher Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.bookcount}</TableCell>
              <TableCell>{report.publisherprice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Report
