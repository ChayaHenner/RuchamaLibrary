import React from 'react'
import { NewBookConfirmP } from '../../utils/types'
import { Card, CardContent, Typography, Grid } from '@mui/material'
import { addbookstyle } from '../../styles/addbook.styles'

const NewBookConfirm: React.FC<NewBookConfirmP> = ({ data }) => {
  return (
    <Card sx={addbookstyle.card}>
      <CardContent>
        <Typography variant="h5" mb={2}>
          BOOKS CREATED
        </Typography>
        <Grid container spacing={2}>
          {data?.books.map((book) => (
            <Grid item xs={12} key={book.id}>
              <Card sx={addbookstyle.card2}>
                <Typography variant="h3" mb={2}>
                  {data.name}
                </Typography>
                <Typography variant="body2" mb={2}>
                  {data.author}
                </Typography>
                <Typography variant="body2">
                  Book Code: {data.bookCode}
                </Typography>
                <Typography variant="body2">Book ID: {book.id}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NewBookConfirm
