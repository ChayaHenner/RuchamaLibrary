import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { NewBookConfirmProps } from '../../utils/types'
import { borrowstyle } from './borrow.style'

const NewBorrowConfirm: React.FC<NewBookConfirmProps> = ({ data }) => {
  console.log(data)

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography margin={4} variant="h3">
          Confirm Borrow
        </Typography>
        <Button
          onClick={() => {
            window.location.reload()
          }}
        >
          Borrow More
        </Button>
        <Button
          component={Link}
          to={`/profile/${data[0]?.reader.id}`}
          variant="contained"
          color="primary"
          sx={borrowstyle.margin}
        >
          View Full History
        </Button>
      </Box>
      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.book.bookCode.name} - ${item.book.bookCode.author} - ${item.book.id}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default NewBorrowConfirm
