import { FC } from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { publisherSchema } from './addpublisher.config'
import { PublisherForm } from '../../utils/types'
import { postPublisher } from '../../api/publisher'
import { addpublisherstyle } from './addpublisher.style'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const AddPublisher: FC = () => {
  const { register, handleSubmit, formState } = useForm<PublisherForm>({
    resolver: yupResolver(publisherSchema),
  })
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<PublisherForm> = async (data) => {
    console.log(data)
    const resp = await postPublisher(data)
    Swal.fire({
      title: ` Added Publisher ${resp.name}! `,
      icon: 'success',
    }).then(() => {
      window.location.reload
      navigate('/report')
      console.log('here')
    })
  }

  return (
    <Box sx={addpublisherstyle.box}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <TextField
            margin="dense"
            {...register('name')}
            label="Publisher Name"
            error={!!formState.errors?.name}
            helperText={formState.errors?.name?.message}
          />
        </Grid>
        <Grid>
          <TextField
            margin="dense"
            {...register('country')}
            label="Country"
            error={!!formState.errors?.country}
            helperText={formState.errors?.country?.message}
          />
        </Grid>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  )
}

export default AddPublisher
