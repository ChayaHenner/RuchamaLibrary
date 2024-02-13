import { Grid, CardContent, Typography, Divider, Button } from '@mui/material'
import { FC } from 'react'
import { BookCardProp } from '../../utils/types'
import { booksstyle } from './books.styles'
import { CustomCard } from '../readers/readers.style'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import Swal from 'sweetalert2'
import { patchDeleteBook } from '../../api/bookinstances'

const BookCard: FC<BookCardProp> = ({ book }) => {
  console.log(book)
  const deleteBook = async () => {
    Swal.fire({
      title: ' Are you sure?',
      text: `You want to delete book ${book.name}`,
      icon: 'question',
      confirmButtonText: 'confirm',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await patchDeleteBook(book.bookCode);
          Swal.fire({
            title: 'Deleted!',
            text: ` book ${book.name}`,
            icon: 'success',
            confirmButtonText: 'confirm',
          }).then(() => {
            
              window.location.reload();
           
          });
        } catch {
          Swal.fire({
            title: 'Can\'t Delete',
            text: 'Not all books are in Library',
            icon: 'warning',
          });
        }
      }
    });
  };
  return (
    <Grid key={book.bookCode} item xs={12} sm={6} md={4} lg={3}>
      <CustomCard inLib={book.booksNotTaken > 0} categoryColor={book.category}>
        <CardContent>
          <Typography variant="h3" component="div" sx={booksstyle.typography}>
            {book.name}
          </Typography>
          {/* <Typography variant="h5" component="div" sx={{ display: 'inline', marginLeft: 5 }}>
                  ({book.bookCode})
                </Typography> */}
          <Typography variant="h5" component="div">
            {book.author}
          </Typography>
          <Typography variant="h6" component="div">
            {book.publisher.name},{book.publisher.country}
          </Typography>
          <Divider sx={booksstyle.dividermargins} />
          <Typography variant="h5" component="div">
            Amount {book.booksCount}
          </Typography>
          {book.booksNotTaken > 0 && (
            <Typography variant="h5" component="div">
              In library {book.booksNotTaken}
            </Typography>
          )}
           <Button onClick={deleteBook}>
              <DeleteRoundedIcon />
            </Button>
        </CardContent>
      </CustomCard>
    </Grid>
  )
}
export default BookCard
