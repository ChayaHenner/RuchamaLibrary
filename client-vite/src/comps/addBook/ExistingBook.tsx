import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, Resolver } from 'react-hook-form'
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import NewBookConfirm from './NewBookConfirm'
import { existingBookSchema } from './addbook.config'
import {
  BookConfirmNewest,
  BookInstance,
  ExistingBookFormValues,
} from '../../utils/types'
import { getBookInstances } from '../../api/bookinstances'
import { postBookExisting } from '../../api/book'
import { addbookstyle } from './addbook.styles'

const ExistingBook: FC = () => {
  const [books, setBooks] = useState<BookInstance[]>([])
  const [newbooks, setNewBooks] = useState<BookConfirmNewest>()
  const [confirm, setConfirm] = useState<boolean>(false)

  const methods = useForm<ExistingBookFormValues>({
    resolver: yupResolver(
      existingBookSchema,
    ) as Resolver<ExistingBookFormValues>,
  })

  const onSubmit: SubmitHandler<ExistingBookFormValues> = async (
    data: ExistingBookFormValues,
  ) => {
    setNewBooks(await postBookExisting(data))
    setConfirm(true)
  }

  useEffect(() => {
    const fetchBooks = async () => {
      setBooks(await getBookInstances())
      console.log(books)
    }
    fetchBooks()
  }, [])

  return (
    <Box sx={addbookstyle.box}>
      {confirm ? (
        <NewBookConfirm data={newbooks} />
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            Add Existing Book
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Autocomplete
                      sx={addbookstyle.textfield}
                      options={books}
                      getOptionLabel={(option: BookInstance) =>
                        `${option.name} (${option.bookCode})`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Book"
                          error={!!methods.formState.errors.bookCode}
                          helperText={
                            methods.formState.errors.bookCode?.message
                          }
                        />
                      )}
                      onChange={(_, value) => {
                        methods.setValue('bookCode', value?.bookCode)
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <TextField
                      sx={addbookstyle.textfield}
                      label="Amount"
                      // name="amount"
                      defaultValue={1}
                      type="number"
                      error={!!methods.formState.errors.amount}
                      helperText={methods.formState.errors.amount?.message}
                      {...methods.register('amount')}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </>
      )}
    </Box>
  )
}

export default ExistingBook
