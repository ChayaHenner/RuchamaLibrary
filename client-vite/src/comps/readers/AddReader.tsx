import { FC } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box, Grid } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddReaderProps, ReaderForm } from '../../utils/types'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { formSchema } from './readers.config'
import { addReader } from '../../api/reader'
import Swal from 'sweetalert2'
import { readerstyle } from './readers.style'
import { useNavigate } from 'react-router-dom'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs' // for date manipulation

const AddReader: FC<AddReaderProps> = ({ onClose }) => {
  const methods = useForm<ReaderForm>({
    resolver: yupResolver(formSchema),
  })
  const navigate = useNavigate()

  const handleSubmit: SubmitHandler<ReaderForm> = async (data: ReaderForm) => {
    try {
      const dobAsDate = data?.dob?.toISOString().split('T')[0] || ''
      console.log(data)
      data.dob = new Date(dobAsDate)
      const reader = await addReader(data)

      Swal.fire({
        title: 'Added Reader',
        text: 'Enjoy your read',
        icon: 'success',
        confirmButtonText: 'Confirm',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/profile/${reader.id}`)
        }
      })
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { error: errType, info } = error.response.data
        Swal.fire({
          title: `Error: ${errType}`,
          text: info,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      } else {
        Swal.fire({
          title: 'Unknown Error',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    }
  }

  const handleDateChange = (date: any) => {
    const minDate = dayjs().subtract(105, 'year').toDate()
    const maxDate = dayjs().subtract(7, 'year').toDate()

    if (date < minDate || date > maxDate) {
      methods.setValue('dob', null)
      console.log('Please select a date between 7 and 105 years ago.')
    } else {
      methods.setValue('dob', date)
    }
  }
  return (
    <Box sx={readerstyle.boxblur}>
      <Button onClick={onClose}>x</Button>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => handleSubmit(data))}>
          <Grid>
            <TextField
              sx={readerstyle.textfield}
              id="name"
              label="Name"
              {...methods.register('name')}
              error={!!methods.formState.errors.name}
              helperText={methods.formState.errors.name?.message}
            />
          </Grid>
          <Grid>
            <TextField
              sx={readerstyle.textfield}
              id="email"
              label="Email"
              error={!!methods.formState.errors.email}
              helperText={methods.formState.errors.email?.message}
              {...methods.register('email')}
            />
          </Grid>

          <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={readerstyle.textfield}
                label="Date of Birth"
                {...methods.register('dob')}
                // value={methods.watch('dob') ?? null}
                // onChange={(date) => methods.setValue('dob', date)}
                onChange={(date: Dayjs | null) => {
                  handleDateChange(date)
                }}
                minDate={dayjs().subtract(105, 'year')}
                maxDate={dayjs().subtract(7, 'year')}
              />
            </LocalizationProvider>
          </Grid>
          <Grid></Grid>

          <Button
            sx={readerstyle.textfield}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add Reader
          </Button>
        </form>
      </FormProvider>
    </Box>
  )
}

export default AddReader
