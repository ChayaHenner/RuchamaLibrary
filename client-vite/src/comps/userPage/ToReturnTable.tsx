import * as React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { BorrowingInfo, ReturnTableProps } from '../../utils/types'
import { Button, Grid, Typography } from '@mui/material'
import { columns } from './userProfile.config'
import { postReturn } from '../../api/borrowing'
import Swal from 'sweetalert2'
import { button2,  text } from './userPage.style'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const ToReturnTable: React.FC<ReturnTableProps> = ({ toReturn }) => {
  console.log(toReturn)
  // const apiRef = React.useRef<any>({});

  const apiRef: React.MutableRefObject<any> = React.useRef<any>({})
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  const setSelectedBooks = () => {
    let selectedRowsCurrent: number[] = []
    apiRef?.current?.getSelectedRows().forEach((book: BorrowingInfo) => {
      selectedRowsCurrent.push(book.id)
    })
    setSelectedRows(selectedRowsCurrent)
  }

  const returnBooksDB = async () => {
    await postReturn(selectedRows)
    Swal.fire({
      title: 'Returned',
      text: 'The books are safely back home',
      icon: 'success',
      confirmButtonText: 'confirm',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
  }
  const printPDF = async () => {
    console.log(":pdffing");
    
    try {
      const pdf = new jsPDF();
      const table = document.getElementById('return-table');

      if (table) {
        const canvas = await html2canvas(table);
        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 10, 10, 180, 240);
        pdf.save('books_to_return.pdf');
      }
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };


  return (
    <Grid>
      <Grid container justifyContent="space-between">
        <Typography variant="h3" sx={text}>
          Books to return
        </Typography>
        <Grid>
        {/* <Button sx={button2} onClick={printPDF} variant="text" >
        print pdf
      </Button> */}
        <Button
          variant="outlined"
          onClick={returnBooksDB}
          disabled={selectedRows.length == 0}
          sx={button2}
        >
          return
        </Button>
      </Grid></Grid>
      {toReturn.length > 0 ? (
        <DataGrid
        slots={{ toolbar: GridToolbar }}
        
          rows={toReturn}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          apiRef={apiRef}
          pageSizeOptions={[5, 10]}
          getRowId={(row: BorrowingInfo) => row.id}
          checkboxSelection
          onRowSelectionModelChange={() => {
            setSelectedBooks()
          }}
        />
      ) : (
        <Typography>none</Typography>
      )}
    </Grid>
  )
}
