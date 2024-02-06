import React from 'react';
import {  BookResponse } from '../utils/types';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export type NewBookConfirmProp =  {
    data: BookResponse | undefined;
}

const NewBookConfirm: React.FC<NewBookConfirmProp> = ({ data }) => {
    
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4, padding: 2 }}>
            <CardContent>
                <Typography variant="h5" mb={2}>
                    BOOKS CREATED
                </Typography>
                <Grid container spacing={2}>
                    {data?.books.map((book) => (
                        <Grid item xs={12} key={book.id}>
                            <Card sx={{ backgroundColor: '#f0f0f0', padding: 2 }}>
                                <Typography variant="h3" mb={2}>{data.book_info.name}</Typography>
                                <Typography variant="body2" mb={2}>{data.book_info.author}</Typography>
                                <Typography variant="body2">
                                    Book Code: {book.bookCode}
                                </Typography>
                                <Typography variant="body2">
                                    Book ID: {book.id}
                                </Typography>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default NewBookConfirm;
