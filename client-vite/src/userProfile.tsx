import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import {ToReturnTable} from './toReturnTable';
import {HistoryTable} from './historyTable';
import { Link } from 'react-router-dom'; 
import { getReaderProfile } from './api/reader';
import { ReaderInfo } from './types';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<ReaderInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserData(await getReaderProfile(id))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(userData);

    fetchData();
  }, []);


  return (
    <Grid>
      <Container>
        {userData ? (
          <>
            <Typography variant='h4' sx={{ m: 1 }}>{userData.reader_name}</Typography>
            <Typography variant='h6' sx={{ m: 1 }}>{userData.reader_email}</Typography>
            <Button component={Link} to='/borrow' variant="contained" color="primary" sx={{ margin: '1rem 0' }}>
              Borrow books
            </Button>
            <Typography variant='h3' sx={{ m: 2 }}>Books to return</Typography>
            {userData.toreturn ? <ToReturnTable toReturn={userData.toreturn} /> :
              (<Typography>-none-</Typography>)}
              <Divider sx={{marginTop:10}}/>
            <Typography variant='h3' sx={{ m: 2 }}>Books History</Typography>
            {userData.history ? <HistoryTable history={userData.history} /> :
              (<Typography>-none-</Typography>)}
          </>
        ) : (
          <p></p>
        )}</Container>
    </Grid>
  );
};

export default UserProfile;
