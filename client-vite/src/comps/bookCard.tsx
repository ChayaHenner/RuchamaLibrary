import { Grid, CardContent, Typography, Divider } from '@mui/material';
import  {FC } from 'react';
import { CustomCard } from '../styles/styles';
import { BookCardProp } from '../utils/types';


const BookCard :FC<BookCardProp> = ({ book }) => {

    return (
        <>
           <Grid key={book.book_book_code} item xs={12} sm={6} md={4} lg={3}>
            <CustomCard
              inLib={book.not_taken_count > 0}
              categoryColor={book.bookinstance_category}>
              <CardContent>
                <Typography variant="h3" component="div" style={{ display: 'inline' }}>
                  {book.bookinstance_book_name}
                </Typography>
                <Typography variant="h5" component="div" style={{ display: 'inline', marginLeft: 5 }}>
                  ({book.book_book_code})
                </Typography>
                <Typography variant="h5" component="div">
                  {book.bookinstance_author}
                </Typography>
                <Divider sx={{
                  margin: 3
                }} />
                <Typography variant="h5" component="div">
                  Amount  {book.total_book_ids}
                </Typography>
                {book.not_taken_count > 0 && (
                  <Typography variant="h5" component="div">
                    In library {book.not_taken_count}
                  </Typography>
                )}
              </CardContent>
            </CustomCard>
          </Grid>
        </>
    )
}
export default BookCard