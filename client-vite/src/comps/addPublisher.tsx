import { FC } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { publisherSchema } from '../schemas';
import { PublisherForm } from '../types';
import { postPublisher } from '../api/publisher';



const AddPublisher: FC = () => {
    const { register, handleSubmit, formState } = useForm<PublisherForm>({
        resolver: yupResolver(publisherSchema),
    });

    const onSubmit: SubmitHandler<PublisherForm> = async (data) => {
        console.log(data);
        await postPublisher(data)
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
            {/* <Button onClick={() => {
                console.log(register);
            }}>log</Button> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                    <TextField
                        margin='dense'
                        {...register('publisher_name')}
                        label="Publisher Name"
                        name="publisher_name"
                        error={!!formState.errors?.publisher_name}
                        helperText={formState.errors?.publisher_name?.message}
                    /></Grid>
                <Grid>

                    <TextField
                        margin='dense'
                        {...register('country')}
                        label="Country"
                        name="country"
                        error={!!formState.errors?.country}
                        helperText={formState.errors?.country?.message}
                    /></Grid>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
};

export default AddPublisher;
