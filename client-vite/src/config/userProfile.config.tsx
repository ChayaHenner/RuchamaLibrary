import {  GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Book ID', width: 100 },
    { field: 'name', headerName: 'Book Name', width: 200, valueGetter: (params) => params.row.book.bookCode.name },
    { field: 'author', headerName: 'Author', width: 150, valueGetter: (params) => params.row.book.bookCode.author },
    { field: 'category', headerName: 'Category', width: 120, valueGetter: (params) => params.row.book.bookCode.category },
    // { field: 'publisher', headerName: 'Publisher ID', width: 130, valueGetter: (params) => params.row.book_instance.publisher },
    { field: 'price', headerName: 'Price', type: 'number', width: 90, valueGetter: (params) => params.row.book.bookCode.price },
    { field: 'dateBorrowed', headerName: 'Date Borrowed', width: 180 },
];

