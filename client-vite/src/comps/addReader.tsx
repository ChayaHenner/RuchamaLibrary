import { FC } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddReaderProps, ReaderForm } from '../types';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { formSchema } from '../schemas';
import { addReader } from '../api/reader';
import Swal from 'sweetalert2'


const AddReader: FC<AddReaderProps> = ({ onClose }) => {

    const methods = useForm<ReaderForm>({
        resolver: yupResolver(formSchema),
    });

    const handleSubmit: SubmitHandler<ReaderForm> = async (data: ReaderForm) => {
        const dobAsDate = data.dob.toISOString().split('T')[0];
        data.dob = new Date(dobAsDate)
        const isValid = await methods.trigger();
        if (isValid) {
            await addReader(data);
            Swal.fire({
                title: "Added Reader",
                text: "Enjoy your read",
                icon: "success",
                confirmButtonText: "confirm",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                    //send to profile?
                }
            })
            console.log('data submitted', data);
        } else {
            console.log('form validation failed');
        }
    };



    return (
        <Box
            sx={{
                position: "fixed",
                top: "0px",
                right: "0px",
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                backdropFilter: "blur(10px)",
                background: "rgba(128, 128, 128, 0.4)",
            }}
        >      <Button onClick={onClose}>x</Button>

            <FormProvider  {...methods}>
                <form onSubmit={methods.handleSubmit((data) => handleSubmit(data))}>
                    <Grid>
                        <TextField
                            sx={{ margin: 1 }}
                            id="name"
                            label="Name"
                            {...methods.register('name')}
                            error={!!methods.formState.errors.name}
                            helperText={methods.formState.errors.name?.message}

                        />
                    </Grid>
                    <Grid>

                        <TextField
                            sx={{ margin: 1 }}
                            id="email"
                            label="Email"
                            error={!!methods.formState.errors.email}
                            helperText={methods.formState.errors.email?.message}
                            {...methods.register('email')}
                        />
                    </Grid>

                    <Grid>

                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{ margin: 1, width: 218 }}
                                label="Date of Birth"
                                // {...methods.register('dob')}
                                value={methods.watch('dob') ?? null}
                                onChange={(date) => methods.setValue('dob', date)}
                            />
                        </LocalizationProvider> */}
                    </Grid>

                    <Button sx={{ margin: 1 }} variant="contained" color="primary" type="submit">
                        Add Reader
                    </Button>
                </form>
            </FormProvider>
        </Box>
    );
};

export default AddReader;