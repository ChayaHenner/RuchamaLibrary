import { useState } from 'react'
import {
  Grid,
  CardContent,
  Typography,
  Divider,
  Button,
  Popover,
} from '@mui/material'
import { FC } from 'react'
import { BookCardProp } from '../../utils/types'
import { booksstyle } from './books.styles'
import { CustomCard } from '../readers/readers.style'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Swal from 'sweetalert2'
import { patchDeleteBook } from '../../api/bookinstances'

const BookCard: FC<BookCardProp> = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const deleteBook = async () => {
    Swal.fire({
      title: ' Are you sure?',
      text: `You want to delete book ${book.name}`,
      icon: 'question',
      confirmButtonText: 'confirm',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await patchDeleteBook(book.bookCode)
          Swal.fire({
            title: 'Deleted!',
            text: ` book ${book.name}`,
            icon: 'success',
            confirmButtonText: 'confirm',
          }).then(() => {
            window.location.reload()
          })
        } catch {
          Swal.fire({
            title: "Can't Delete",
            text: 'Not all books are in Library',
            icon: 'warning',
          })
        }
      }
    })
  }

  return (
    <Grid key={book.bookCode} item xs={12} sm={6} md={4}>
      <CustomCard  inlib={book.booksNotTaken > 0 ? "true" : "false"} categorycolor={book.category}>
        <CardContent>
          <Typography variant="h3" sx={booksstyle.typography}>
            {book.name}
          </Typography>
          <Typography variant="h5" component="div">
            {book.author}
          </Typography>
          <Typography variant="h6" component="div">
            {book.publisher.name}, {book.publisher.country}
          </Typography>
          <Divider sx={booksstyle.dividermargins} />

          <Grid container alignItems="baseline">
            <Grid item xs={7}>
              <Typography variant="h5" component="div">
                Amount {book.booksCount}
              </Typography>
              {book.booksNotTaken > 0 && (
                <Typography variant="h5" component="div">
                  In library {book.booksNotTaken}
                </Typography>
              )}
            </Grid>
            <Grid item xs={5} container justifyContent="flex-end">
              <Button onClick={deleteBook} sx={booksstyle.text}>
                <DeleteRoundedIcon />
              </Button>
              <Button
                aria-owns={open ? 'book-info-popover' : undefined}
                aria-haspopup="true"
                onClick={(e)=>{ setAnchorEl(e.currentTarget)}}
                sx={booksstyle.text}
              >
                <MoreVertRoundedIcon />
              </Button>
              <Popover
                id="book-info-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={()=>{    setAnchorEl(null) }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography variant="body2" sx={{ p: 2 }}>
                  {book.books.map((bookItem) => (
                    <Grid container key={bookItem.id} >
                      <Typography >{bookItem.id} </Typography>
                      {bookItem.bookTaken?(<Typography key={bookItem.id}>&nbsp;taken </Typography>):(<Typography key={bookItem.id}>&nbsp;here </Typography>)}
                    </Grid>
                  ))}
                </Typography>
              </Popover>
            </Grid>
          </Grid>
        </CardContent>
      </CustomCard>
    </Grid>
  )
}

export default BookCard
