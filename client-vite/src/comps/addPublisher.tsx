import { FC } from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { publisherSchema } from '../utils/schemas'
import { PublisherForm } from '../utils/types'
import { postPublisher } from '../api/publisher'
import { addpublisherstyle } from '../styles/addpublisher.style'

const AddPublisher: FC = () => {
  const { register, handleSubmit, formState } = useForm<PublisherForm>({
    resolver: yupResolver(publisherSchema),
  })

  const onSubmit: SubmitHandler<PublisherForm> = async (data) => {
    console.log(data)
    await postPublisher(data)
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
            // name="country"
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
