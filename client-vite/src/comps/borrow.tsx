import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, Typography, Autocomplete, TextField, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import NewBorrowConfirm from './borrowConfirm';
import { getBooksInLibrary } from '../api/book';
import { getReaders } from '../api/reader';
import { postBorrow } from '../api/borrowing';
import { BookType, BorrowedBook, Reader } from '../utils/types';

const Borrow: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [books, setBooks] = useState<BookType[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [data, setData] = useState<BorrowedBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedReader, setSelectedReader] = useState<number | null>();
  const [selectedItems, setSelectedItems] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBooks(await getBooksInLibrary());
        setReaders(await getReaders(undefined));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleBorrow = async () => {
    if (selectedItems.length > 0) {
      try {
        console.log(selectedItems);
        console.log(readers);
        
        const bookIds = selectedItems.map(item => item.book_id);
        const readerId = selectedReader;
        const request = {
          reader_id: readerId,
          book_ids: bookIds,
        }
        const data =  await postBorrow(request)
        console.log(data);
        setConfirm(true)
        setData(data)        
        setSelectedItems([]);

      } catch (error) {
        console.error('Error making the request:', error);
      }
    } else {
      console.warn('Please select books to borrow.');
    }
  };

  const addToSelectedItems = () => {
    if (selectedBook !== null) {
      const isBookAlreadySelected = selectedItems.some(item => item.book_id === selectedBook);
      if (!isBookAlreadySelected) {
        const selectedBookInfo = books.find(book => book.book_id === selectedBook);
        if (selectedBookInfo) {
          setSelectedItems(prevItems => [...prevItems, selectedBookInfo]);
        }
      } else {
        console.log("Book is already selected!");
      }
    }
  };

  const removeFromSelectedItems = (bookId: number) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.book_id !== bookId));
  };

  const filteredBooks = books.filter(book => !selectedItems.some(item => item.book_id === book.book_id));

  return (
    <Container>{confirm? (<NewBorrowConfirm data={data}/>):(
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Typography variant='h3' sx={{ margin: 4 }}>Borrow Books</Typography>
          <FormControl sx={{ width: 400 }}>
            <Autocomplete sx={{ margin: 1 }}
              options={readers}
              getOptionLabel={(option) => ` ${option.name}    (${option.reader_id})`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="reader"
                />
              )}
              onChange={(_, value) => setSelectedReader(value?.reader_id || null)}
            />
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ width: 400 }}>
              <Autocomplete sx={{ margin: 1 }}
                options={filteredBooks}
                getOptionLabel={(option) => `(${option.book_id})   ${option.book_code.book_name} - ${option.book_code.author} `}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="book"
                  />
                )}
                value={null}
                onChange={(_, value) => setSelectedBook(value?.book_id || null)}
              />
            </FormControl>

            <Button variant="contained" sx={{ margin: 1 }} onClick={addToSelectedItems}>
              Borrow
            </Button>
          </Box>      <Button variant="outlined" color="primary" onClick={handleBorrow} sx={{ margin: 5 }}>
            Complete Borrow
          </Button>
        </Box>

        <Box sx={{ margin: 7 }}>
          {selectedItems.length > 0 && (
            <>
              <Typography variant="h5">Selected Items:</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Book Name</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Book ID</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedItems.map((item) => (
                      <TableRow key={item.book_id}>
                        <TableCell>{item.book_code.book_name}</TableCell>
                        <TableCell>{item.book_code.author}</TableCell>
                        <TableCell>{item.book_id}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeFromSelectedItems(item.book_id)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box> 
      </Box>
)}

    </Container>
  );
};

export default Borrow;
