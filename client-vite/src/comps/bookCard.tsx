import { Grid, CardContent, Typography, Divider } from '@mui/material';
import  {FC } from 'react';
import { CustomCard } from '../styles/styles';
import { BookCardProp } from '../utils/types';
import { booksstyle } from '../styles/books.styles';


const BookCard :FC<BookCardProp> = ({ book }) => {
console.log(book);

    return (
       
           <Grid key={book.book_bookCodeBookCode} item xs={12} sm={6} md={4} lg={3}>
            <CustomCard
              inLib={book.not_taken_count > 0}
              categoryColor={book.bookinstance_category}>
              <CardContent>
                <Typography variant="h3" component="div" sx={{ display: 'inline' }}>
                  {book.bookinstance_name}
                </Typography>
                <Typography variant="h5" component="div" sx={{ display: 'inline', marginLeft: 5 }}>
                  ({book.book_bookCodeBookCode})
                </Typography>
                <Typography variant="h5" component="div">
                  {book.bookinstance_author}
                </Typography>
                <Divider sx={booksstyle.dividermargins} />
                <Typography variant="h5" component="div">
                  Amount  {book.total_ids}
                </Typography>
                {book.not_taken_count > 0 && (
                  <Typography variant="h5" component="div">
                    In library {book.not_taken_count}
                  </Typography>
                )}
              </CardContent>
            </CustomCard>
          </Grid>
      
    )
}
export default BookCard