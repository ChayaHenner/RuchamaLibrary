import { FC } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box, Grid } from '@mui/material'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { yupResolver } from '@hookform/resolvers/yup'
import { AddReaderProps, ReaderForm } from '../../utils/types'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { formSchema } from '../../utils/schemas'
import { addReader } from '../../api/reader'
import Swal from 'sweetalert2'
import { readerstyle } from './readers.style'
import { useNavigate } from 'react-router-dom'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

const AddReader: FC<AddReaderProps> = ({ onClose }) => {
  const methods = useForm<ReaderForm>({
    resolver: yupResolver(formSchema),
  })
  const navigate = useNavigate()

  const handleSubmit: SubmitHandler<ReaderForm> = async (data: ReaderForm) => {
    const dobAsDate = data?.dob?.toISOString().split('T')[0] || ''
    data.dob = new Date(dobAsDate)
    const reader = await addReader(data)
    Swal.fire({
      title: 'Added Reader',
      text: 'Enjoy your read',
      icon: 'success',
      confirmButtonText: 'confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(reader)

        navigate(`/profile/${reader.id}`)
      }
    })
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
                value={methods.watch('dob') ?? null}
                onChange={(date) => methods.setValue('dob', date)}
              />
            </LocalizationProvider>
          </Grid>

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
