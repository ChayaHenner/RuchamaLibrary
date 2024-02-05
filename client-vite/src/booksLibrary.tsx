import React, { useEffect, useState } from 'react';
import { Grid, CardContent, Typography, Container, TextField, Divider, Input } from '@mui/material';
import { BookLibrary } from './types';
import { CustomCard } from './styles';
import { getBooksLibrary } from './api/bookinstances';

const BooksLibrary: React.FC = () => {
  const [books, setBooks] = useState<BookLibrary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBooks(await getBooksLibrary());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(books);

    fetchData();
  }, []);

  const filteredBooks = books.filter((book: BookLibrary) => {
    const bookName = book.bookinstance_book_name ? book.bookinstance_book_name.toLowerCase() : '';
    const bookCode = book.book_book_code ? book.book_book_code.toString() : '';
    return (
      bookName.includes(searchTerm.toLowerCase()) ||
      bookCode.includes(searchTerm.toLowerCase())
    );
  });


  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <Grid container spacing={3} alignItems="center" sx={{ margin: 5 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Books</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
             <Input 
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          </Grid>
        </Grid>
        {filteredBooks.map((book: BookLibrary) => (
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
        ))}
      </Grid>
    </Container>
  );
};

export default BooksLibrary;
