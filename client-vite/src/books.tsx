import { useEffect, useState, FC } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { getBookInstances } from './api/bookinstances';
import { BookInstance } from './types';

const Book: FC = () => {
  const [books, setBooks] = useState<BookInstance[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setBooks(await getBookInstances());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Books
        </Typography>
      </Grid>

      {books?.map((book: any) => (
        <Grid key={book.book_code} item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {book.book_name}
              </Typography>
              <Typography color="textSecondary">{book.author}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

};

export default Book;
