import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import NewBookConfirm from './newBookConfirm';
import { Publisher, BookFormProps, BookResponse } from '../utils/types';
import { Link } from 'react-router-dom';
import { CategoryLevels } from '../utils/config';
import { bookFormSchema } from '../utils/schemas';
import { postBook } from '../api/book';
import { getPublishers } from '../api/publisher';
import { addbookstyle } from '../styles/addbook.styles';

const BookFormNew: FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [confirm, setConfirm] = useState(false);
  const [books, setBooks] = useState<BookResponse>();
  const [publisherValue, setPublisherValue] = useState<Publisher|null>(publishers[0]);
  
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
    setPublisherValue(publishers[0])
    // setPublisherValue({publisher_name:"New York",publisher_id:"1"})

  }, []);

  const submitBook: SubmitHandler<BookFormProps> = async (d: BookFormProps) => {
    const isValid = await methods.trigger();
    if (isValid) {
      setBooks(await postBook(d))
      setConfirm(true)
      
    } else {
      console.log('form validation failed');
    }
  };

  return (
    <Box
      sx={addbookstyle.box}>
      {confirm ? <NewBookConfirm data={books} /> :
        (<FormProvider {...methods}>
          <Typography variant="h6" gutterBottom marginTop={20}>Add New Books</Typography>
          <Button component={Link} to="/addexistingbook" variant="contained" color="primary" sx={{ margin: '1rem 0' }}>
            Add Existing Book
          </Button>
          <form onSubmit={(e) => methods.handleSubmit((data) => submitBook(data, e))(e)}>
            <Grid>
              <TextField sx={addbookstyle.textfield}
                label="Book Name"
                error={!!methods.formState.errors.book_name}
                helperText={methods.formState.errors.book_name?.message}
                {...methods.register('book_name')}
              />
            </Grid>
            <Grid>
              <TextField sx={addbookstyle.textfield}
                label="Author"
                error={!!methods.formState.errors.author}
                helperText={methods.formState.errors.author?.message}
                {...methods.register('author')}
              />
            </Grid>
            <Grid>
            
              <Autocomplete sx={addbookstyle.textfield}
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
                // value={publisherValue}
                onChange={(_:any,publisher:Publisher)=>{console.log(publisher);
                //  setPublisherValue(publisher)
                  methods.setValue('publisher_id', publisher?.publisher_id )}}
              />
            </Grid>
            <Grid >
              <TextField sx={addbookstyle.textfield}
                label="Amount"
                defaultValue={1}
                type="number"
                error={!!methods.formState.errors.amount}
                helperText={methods.formState.errors.amount?.message}
                {...methods.register('amount')}
              />
            </Grid>

            <Grid>
              <FormControl sx={addbookstyle.textfield}>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                defaultValue={"Adults"}
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
              <TextField sx={addbookstyle.textfield}
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