import { Grid, Typography } from '@mui/material';
import React from 'react';


const Home: React.FC = () => {

  return (
    <Grid container spacing={3} alignItems="center"  sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>

    <Typography variant="h4">
     Welcome to Ruchama Library✋📚
    </Typography></Grid>
  );
};

export default Home;
