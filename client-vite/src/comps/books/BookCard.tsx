import { useState } from 'react'
import {
  Grid,
  CardContent,
  Typography,
  Divider,
  Button,
  Popover,
  Snackbar,
} from '@mui/material'
import { FC } from 'react'
import { BookCardProp } from '../../utils/types'
import { booksstyle } from './books.styles'
import { CustomCard } from '../readers/readers.style'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import { getLocationBook } from '../../api/book'
import { swalBook } from './book.swal'

const BookCard: FC<BookCardProp> = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null)
  const open = Boolean(anchorEl)

  const location = async (id: number) => {
    try {
      const locationInfo = await getLocationBook(id)
      setSnackBarMessage(locationInfo)
    } catch (error) {
      console.error('Error retrieving location:', error)
    }
  }

  return (
    <Grid key={book.bookCode} item xs={12} sm={6} md={4}>
      <CustomCard
        inlib={book.booksNotTaken > 0 ? 'true' : 'false'}
        categorycolor={book.category}
        sx={booksstyle.relativegrid}
      >
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
            <Grid item xs={5} container sx={booksstyle.absolutegrid}>
              <Button
                onClick={() => {
                  swalBook(book.bookCode, book.name)
                }}
                sx={booksstyle.text}
              >
                <DeleteRoundedIcon />
              </Button>
              <Button
                onClick={(e) => {
                  setAnchorEl(e.currentTarget)
                }}
                sx={booksstyle.text}
              >
                <MoreVertRoundedIcon />
              </Button>
              <Popover
                id="book-info-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={() => {
                  setAnchorEl(null)
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Grid sx={booksstyle.p1}>
                  {book.books.map((bookItem) => (
                    <Grid container key={bookItem.id}>
                      <Button
                        disabled={!bookItem.bookTaken}
                        onClick={() => {
                          location(bookItem.id)
                        }}
                        key={bookItem.id}
                      >
                        {bookItem.id}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Popover>
            </Grid>
          </Grid>
        </CardContent>

        <Snackbar
          open={!!snackBarMessage}
          autoHideDuration={6000}
          onClose={() => setSnackBarMessage(null)}
          message={`Book by ` + snackBarMessage || ''}
        />
      </CustomCard>
    </Grid>
  )
}

export default BookCard
