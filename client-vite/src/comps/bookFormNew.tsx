import { FC, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Grid,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import NewBookConfirm from './newBookConfirm'
import { Publisher, BookFormProps, BookConfirmNewest } from '../utils/types'
import { CategoryLevels } from '../utils/config'
import { bookFormSchema } from '../utils/schemas'
import { postBook } from '../api/book'
import { getPublishers } from '../api/publisher'
import { addbookstyle } from '../styles/addbook.styles'

const BookFormNew: FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [confirm, setConfirm] = useState<boolean>(false)
  const [books, setBooks] = useState<BookConfirmNewest>()

  const methods = useForm<BookFormProps>({
    resolver: yupResolver(bookFormSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPublishers(await getPublishers())
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const submitBook: SubmitHandler<BookFormProps> = async (d: BookFormProps) => {
    setBooks(await postBook(d))
    setConfirm(true)
  }

  return (
    <Box sx={addbookstyle.box}>
      {confirm ? (
        <NewBookConfirm data={books} />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitBook)}>
            <Grid>
              <TextField
                sx={addbookstyle.textfield}
                label="Book Name"
                error={!!methods.formState.errors.name}
                helperText={methods.formState.errors.name?.message}
                {...methods.register('name')}
              />
            </Grid>
            <Grid>
              <TextField
                sx={addbookstyle.textfield}
                label="Author"
                error={!!methods.formState.errors.author}
                helperText={methods.formState.errors.author?.message}
                {...methods.register('author')}
              />
            </Grid>
            <Grid>
              <Autocomplete
                sx={addbookstyle.textfield}
                options={publishers}
                getOptionLabel={(option) => `${option.name} `}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Publisher"
                    error={!!methods.formState.errors.publisher}
                    helperText={methods.formState.errors.publisher?.message}
                  />
                )}
                onChange={(_, publisher: Publisher | null) => {
                  methods.setValue('publisher', publisher?.id)
                }}
              />
            </Grid>
            <Grid>
              <TextField
                sx={addbookstyle.textfield}
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
                  defaultValue={'Adults'}
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
              <TextField
                sx={addbookstyle.textfield}
                label="Price"
                type="number"
                error={!!methods.formState.errors.price}
                helperText={methods.formState.errors.price?.message}
                {...methods.register('price')}
              />
            </Grid>
            <Button type="submit">Add Books</Button>
          </form>
        </FormProvider>
      )}
    </Box>
  )
}

export default BookFormNew
