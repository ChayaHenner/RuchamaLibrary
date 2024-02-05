import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import NewBookConfirm from './newBookConfirm';
import { Publisher, Book, BookFormProps } from './types';
import { Link } from 'react-router-dom';
import { CategoryLevels } from './config';
import { bookFormSchema } from './schemas';
import { postBook } from './api/book';
import { getPublishers } from './api/publisher';

const BookFormNew: FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [confirm, setConfirm] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  // const [books, setBooks] = useState<Book[]>([]);

  const methods = useForm<BookFormProps>({
    resolver: yupResolver(bookFormSchema),
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        setPublishers(await getPublishers());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const submitBook: SubmitHandler<BookFormProps> = async (d: BookFormProps) => {
    const isValid = await methods.trigger();
    if (isValid) {
      setBooks(await postBook(d))
      console.log('data submitted', d);
      
      setConfirm(true)
    } else {
      console.log('form validation failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      {confirm ? <NewBookConfirm data={books} /> :
        (<FormProvider {...methods}>
          <Typography variant="h6" gutterBottom>Add New Books</Typography>
          <Button component={Link} to="/addexistingbook" variant="contained" color="primary" sx={{ margin: '1rem 0' }}>
            Add Existing Book
          </Button>
          <form onSubmit={(e) => methods.handleSubmit((data) => submitBook(data, e))(e)}>
            <Grid>
              <TextField sx={{ margin: 1 }}
                label="Book Name"
                error={!!methods.formState.errors.book_name}
                helperText={methods.formState.errors.book_name?.message}
                {...methods.register('book_name')}
              />
            </Grid>
            <Grid>
              <TextField sx={{ margin: 1 }}
                label="Author"
                error={!!methods.formState.errors.author}
                helperText={methods.formState.errors.author?.message}
                {...methods.register('author')}
              />
            </Grid>
            <Grid>
              <Autocomplete sx={{ margin: 1, width: 220 }}
                options={publishers}
                getOptionLabel={(option) => `${option.publisher_name} (${option.publisher_id})`}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Publisher"
                    error={!!methods.formState.errors.publisher_id}
                    helperText={methods.formState.errors.publisher_id?.message}
                  />
                )}
                onChange={(_, value) => methods.setValue('publisher_id', value?.publisher_id)}
              />
            </Grid>
            <Grid >
              <TextField sx={{ margin: 1 }}
                label="Amount"
                defaultValue={1}
                type="number"
                error={!!methods.formState.errors.amount}
                helperText={methods.formState.errors.amount?.message}
                {...methods.register('amount')}
              />
            </Grid>

            <Grid>
              <FormControl sx={{ margin: 1, width: 220 }}>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                  label="Category"
                  error={!!methods.formState.errors?.category}
                  {...methods.register('category')}
                >
                  {Object.values(CategoryLevels).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <TextField sx={{ margin: 1, width: 220 }}
                label="Price"
                type="number"
                error={!!methods.formState.errors.price}
                helperText={methods.formState.errors.price?.message}
                {...methods.register('price')}
              />
            </Grid>
            <Button type="submit">Add Books</Button>
          </form>
        </FormProvider>)}
    </Box>
  );
};

export default BookFormNew;