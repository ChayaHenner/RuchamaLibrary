import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { BookReturn, ReturnTableProps } from '../utils/types';
import { Button, Grid } from '@mui/material';
import { columns } from '../config/userProfile.config';
import { postReturn } from '../api/borrowing';



export const ToReturnTable: React.FC<ReturnTableProps> = ({ toReturn }) => {
    const apiRef = React.useRef<any>();
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

    const setSelectedBooks = () => {
        let selectedRowsCurrent: number[] = []
        apiRef.current.getSelectedRows().forEach((book: BookReturn) => {
            selectedRowsCurrent.push(book.borrowing_id)        
        });
        setSelectedRows(selectedRowsCurrent)
    }

    const returnBooksDB = async () => {
        try {
            postReturn(selectedRows)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <Grid style={{ height: 400, width: '100%' }}>
            
             <Button variant="outlined"onClick={returnBooksDB}
              disabled={selectedRows.length == 0}
              >return</Button>
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
                onRowSelectionModelChange={() => { setSelectedBooks() }}
            />
        </Grid>
    );
}