import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Autocomplete, TextField, Button, Grid, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import NewBookConfirm from './newBookConfirm';
import { existingBookSchema } from '../utils/schemas';
import {  BookInstance, BookResponse, ExistingBookFormValues } from '../utils/types';
import { getBookInstances } from '../api/bookinstances';
import { postBookExisting } from '../api/book';

const ExistingBook: FC = () => {
    const [books, setBooks] = useState<BookInstance[]>([]);
    const [newbooks, setNewBooks] = useState<BookResponse>();
    const [confirm, setConfirm] = useState<boolean>(false);

    const { control, handleSubmit, setValue, formState: { errors }, } = useForm<ExistingBookFormValues>({
        resolver: yupResolver(existingBookSchema),
    });

    const onSubmit: SubmitHandler<ExistingBookFormValues> = async (data: ExistingBookFormValues) => {
        setNewBooks(await postBookExisting(data))
        setConfirm(true)
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setBooks(await getBookInstances());
                console.log(books);

            } catch (error) {
                console.error(error);
            }
        };

        fetchBooks();
    }, []);


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:'100px'
            }}
        >
            {confirm ? 
            <NewBookConfirm data={newbooks} /> 
            : (<>
                <Typography variant="h6" gutterBottom>Add Existing Book</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="book_code"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        options={books}
                                        getOptionLabel={(option:BookInstance) => `${option.book_name} (${option.book_code})`}
                                        onChange={(_, value) => 
                                         setValue('book_code', value?.book_code)
                                    }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Book"
                                                error={!!errors.book_code}
                                                helperText={errors.book_code?.message}
                                                sx={{ width: '100%' }} 
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Amount"
                                        type="number"
                                        error={!!errors.amount}
                                        helperText={errors.amount?.message}
                                        sx={{ width: '100%' }} 
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form></>)}
        </Box>
    );

};

export default ExistingBook;
