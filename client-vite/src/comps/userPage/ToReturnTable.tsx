import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { BorrowingInfo, ReturnTableProps } from '../../utils/types'
import { Button, Grid } from '@mui/material'
import { columns } from './userProfile.config'
import { postReturn } from '../../api/borrowing'
import Swal from 'sweetalert2'

export const ToReturnTable: React.FC<ReturnTableProps> = ({ toReturn }) => {
  console.log(toReturn)

  const apiRef = React.useRef<any>()
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  const setSelectedBooks = () => {
    let selectedRowsCurrent: number[] = []
    apiRef.current.getSelectedRows().forEach((book: BorrowingInfo) => {
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
    <Grid style={{ height: 400, width: '100%' }}>
      <Button
        variant="outlined"
        onClick={returnBooksDB}
        disabled={selectedRows.length == 0}
      >
        return
      </Button>
      <DataGrid
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
    </Grid>
  )
}
