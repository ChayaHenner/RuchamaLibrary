import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { NewBookConfirmProps } from './types';


const NewBorrowConfirm: React.FC<NewBookConfirmProps> = ({ data }) => {
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography margin={4} variant="h3">Confirm Borrow</Typography>
        <Button onClick={() => { window.location.reload() }}>
          Borrow More
        </Button>
        <Button component={Link} to={`/profile/${data[0]?.reader_id.reader_id}`} variant="contained" color="primary" sx={{ margin: '1rem 0' }}>
          View Full History
        </Button>

      </Box>
      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.book_id.book_code.book_name} - ${item.book_id.book_code.author} - ${item.book_id.book_id}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NewBorrowConfirm;
