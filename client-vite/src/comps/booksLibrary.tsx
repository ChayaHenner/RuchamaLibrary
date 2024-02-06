import React, { useEffect, useState } from 'react';
import { Grid,  Container, Input } from '@mui/material';
import { BookLibrary } from '../utils/types';
import { getBooksLibrary } from '../api/bookinstances';
import BookCard from './bookCard';
import { booksstyle } from '../styles/books.styles';

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
        <Grid container spacing={3} alignItems="center" sx={booksstyle.headermargins}>
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
          <BookCard book={book} />
        ))}
      </Grid>
    </Container>
  );
};

export default BooksLibrary;
