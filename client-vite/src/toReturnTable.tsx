import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BookReturn, ReturnTableProps } from './utils/types';
import { Button, Grid } from '@mui/material';
import axios from 'axios'
import Swal from 'sweetalert2'

const columns: GridColDef[] = [
    { field: 'book_id', headerName: 'Book ID', width: 100 },
    { field: 'book_name', headerName: 'Book Name', width: 200, valueGetter: (params) => params.row.book_instance.book_name },
    { field: 'author', headerName: 'Author', width: 150, valueGetter: (params) => params.row.book_instance.author },
    { field: 'category', headerName: 'Category', width: 120, valueGetter: (params) => params.row.book_instance.category },
    { field: 'publisher_id', headerName: 'Publisher ID', width: 130, valueGetter: (params) => params.row.book_instance.publisher_id },
    { field: 'price', headerName: 'Price', type: 'number', width: 90, valueGetter: (params) => params.row.book_instance.price },
    { field: 'date_borrowed', headerName: 'Date Borrowed', width: 180 },
];



export  const ToReturnTable:React.FC<ReturnTableProps>=({ toReturn })=> {
    const apiRef = React.useRef<any>();
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
           const returnBooks =  () => {
            
            let selectedRowsCurrent: number[] = []
            apiRef.current.getSelectedRows().forEach((book: any) => {
                selectedRowsCurrent.push(book.borrowing_id)
            });
            setSelectedRows(selectedRowsCurrent)
            console.log(selectedRows);
    
        }
        const returnBooksDB = async () => {
            try {
                const response = await axios.post('http://localhost:5000/borrowing/returnmany',{borrow_ids:selectedRows});
                console.log(response);
                if(response.data){
                    Swal.fire({
                        title: "Returned",
                        text: "The books are safely back home",
                        icon: "success",
                        confirmButtonText: "confirm",
                        denyButtonText: `Don't save`
                      
                      }).then((result)=>{
                        if(result.isConfirmed){
                            window. location. reload()
                        }   })
                      
                    
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
   
    return (
        <Grid style={{ height: 400, width: '100%' }}>
            {selectedRows.length>0 ?<Button variant="outlined" //wait for it to update
                onClick={returnBooksDB}>return</Button>
            :<Button  variant="outlined"  disabled>return</Button>}
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
                getRowId={(row: BookReturn) => row.book_id}
                checkboxSelection
                onRowSelectionModelChange={()=>{returnBooks()}}
            />
        </Grid>
    );
}