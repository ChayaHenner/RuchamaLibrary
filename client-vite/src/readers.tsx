import  { useEffect, useState,FC } from 'react';
import { Grid, Card, CardContent, Typography, Container, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Reader } from './types';
import { getReaders } from './api/reader';
const Readers: FC = () => {
  const [readers, setReaders]= useState< Reader[] >([]);
  const [searchTerm, setSearchTerm]= useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {

        setReaders(await getReaders(searchTerm));
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(readers);

    fetchData();
  }, [searchTerm]);

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

  return (<Container>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Readers
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Input
          type="text"
          placeholder="Search readers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>

      {readers.map((reader: Reader) => (
        <Grid key={reader.reader_id} item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {reader.name}
              </Typography>
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
      ))}
    </Grid>
  </Container>
  );

};

export default Readers;
