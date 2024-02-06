import { useEffect, useState, FC } from 'react';
import { Grid, Container, Input } from '@mui/material';
import { Reader } from '../utils/types';
import { getReaders } from '../api/reader';
import ReaderCard from './readerCard';
const Readers: FC = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {

        setReaders(await getReaders(searchTerm));
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchTerm]);



  return (
    <Container>
      <Grid container spacing={3}>
  
        <Grid item xs={12}>
          <Input
            type="text"
            placeholder="Search readers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        {readers.map((reader: Reader) => (
          <ReaderCard reader={reader} />
        ))}
      </Grid>
    </Container>
  );

};

export default Readers;
