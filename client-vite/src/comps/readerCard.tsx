import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import  {FC } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ReaderCardProp } from '../utils/types';
import { readerstyle } from '../styles/readers.style';

const ReaderCard :FC<ReaderCardProp>= ({reader}) => {
    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
          return age - 1;
        }
        return age;
      }

    return (
        <>
         <Grid key={reader.reader_id} item xs={12} sm={6} md={4} lg={3} >
          <Card sx={readerstyle.cardreader} >
            <CardContent>
              <Typography variant="h6" component="div" style={readerstyle.inlinetypo}>
                {reader.name}
              </Typography>
              <Typography color="textSecondary" style={readerstyle.inlinetypo}>( {reader.reader_id} )</Typography>
              <Typography color="textSecondary">{reader.email}</Typography>
              <Typography color="textSecondary">age: {calculateAge(reader.dob)}</Typography>
              <Link to={`/profile/${reader.reader_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div">
                  <AccountCircleOutlinedIcon />
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        </>
    )
}
export default ReaderCard