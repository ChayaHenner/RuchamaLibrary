import { Box, Button } from '@mui/material'
import BookFormNew from '../comps/addBook/BookForm'
import Header from '../comps/Header'
import { Link } from 'react-router-dom'
import { addbookstyle } from '../styles/addbook.styles'

const AddBookPage = () => {
  return (
    <>
      {' '}
      <Box sx={addbookstyle.container}>
        <Header title="Add new Book" />
        <Button
          sx={addbookstyle.addButton}
          component={Link}
          to="/addexistingbook"
          variant="contained"
          color="primary"
        >
          Add Existing Book
        </Button>

        <BookFormNew />
      </Box>
    </>
  )
}
export default AddBookPage
