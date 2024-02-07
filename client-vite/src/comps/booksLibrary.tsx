import { useEffect, useState } from 'react';
import { Grid, Container, Input } from '@mui/material';
import { BookLibrary } from '../utils/types';
import { getBooksLibrary } from '../api/bookinstances';
import BookCard from './bookCard';
import { booksstyle } from '../styles/books.styles';

const BooksLibrary = () => {
  const [books, setBooks] = useState<BookLibrary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      setBooks(await getBooksLibrary());
    };

    fetchData();
  }, []);

  const filteredBooks = books.filter((book: BookLibrary) => {//9
    const bookName = book.bookinstance_name ? book.bookinstance_name.toLowerCase() : '';
    const bookCode = book.book_bookCodeBookCode ? book.book_bookCodeBookCode.toString() : '';
    return (
      bookName.includes(searchTerm.toLowerCase()) ||
      bookCode.includes(searchTerm.toLowerCase())
    );
  });


  return (
    <Container >
      <Grid container spacing={5}>
        <Grid container spacing={3} alignItems="center" sx={booksstyle.headermargins}>
          <Grid item xs={12} sm={6}>
            <Input type="text"
              placeholder="Search books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
        </Grid>
        {filteredBooks.map((book: BookLibrary) => (
          <BookCard book={book} key={book.book_bookCodeBookCode}/>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksLibrary;
