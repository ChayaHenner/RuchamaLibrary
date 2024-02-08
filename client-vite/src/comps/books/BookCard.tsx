import { Grid, CardContent, Typography, Divider } from '@mui/material'
import { FC } from 'react'
import { CustomCard } from '../general/styles'
import { BookCardProp } from '../../utils/types'
import { booksstyle } from './books.styles'

const BookCard: FC<BookCardProp> = ({ book }) => {
  console.log(book)

  return (
    <Grid key={book.bookCode} item xs={12} sm={6} md={4} lg={3}>
      <CustomCard inLib={book.booksNotTaken > 0} categoryColor={book.category}>
        <CardContent>
          <Typography variant="h3" component="div" sx={{ display: 'inline' }}>
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
        </CardContent>
      </CustomCard>
    </Grid>
  )
}
export default BookCard
