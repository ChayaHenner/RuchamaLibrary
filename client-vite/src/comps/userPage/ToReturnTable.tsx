import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { BorrowingInfo, ReturnTableProps } from '../../utils/types'
import { Button, Grid, Typography } from '@mui/material'
import { columns } from './userProfile.config'
import { postReturn } from '../../api/borrowing'
import Swal from 'sweetalert2'
import { button2, text } from './userPage.style'

export const ToReturnTable: React.FC<ReturnTableProps> = ({ toReturn }) => {
  console.log(toReturn)

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

  return (
    <Grid >
      <Grid container justifyContent="space-between">
      <Typography variant="h3" sx={text}>
              Books to return
            </Typography>
      <Button
        variant="outlined"
        onClick={returnBooksDB}
        disabled={selectedRows.length == 0}
        sx={button2}
      >
        return
      </Button></Grid>
    {toReturn.length>0? <DataGrid
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
      />:<Typography>none</Typography>}
    </Grid>
  )
}
