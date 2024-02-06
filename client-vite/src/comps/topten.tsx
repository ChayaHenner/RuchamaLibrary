import React, { useState, useEffect } from 'react';
import {Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const TopTen: React.FC = () => {
  const [topBooks, setTopBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/borrowing/topten')
      .then(response => response.json())
      .then(data => setTopBooks(data))
      .catch(error => console.error('Error fetching top ten books:', error));
  }, []);

  return (
    <Container>
      <List>
        {topBooks.map((book, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={book.name}
              secondary={`Borrow Count: ${book.borrowcount}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TopTen;
