import { GridColDef } from '@mui/x-data-grid'
export const columns: GridColDef[] = [
  { field: 'id', headerName: 'Borrow ID', width: 100 },
  {
    field: 'name',
    headerName: 'Book Name',
    width: 200,
    valueGetter: (params) => params.row.book.bookCode.name,
  },
  {
    field: 'bookid',
    headerName: 'Book ID',
    width: 200,
    valueGetter: (params) => params.row.book.id,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
    valueGetter: (params) => params.row.book.bookCode.author,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 120,
    valueGetter: (params) => params.row.book.bookCode.category,
  },
  {
    field: 'publisher',
    headerName: 'Publisher ',
    width: 130,
    valueGetter: (params) => params.row.book.bookCode.publisher.name,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 90,
    valueGetter: (params) => params.row.book.bookCode.price,
  },
  { field: 'dateBorrowed', headerName: 'Date Borrowed', width: 180 },
]