import { useEffect, useState } from "react"
import { getStats } from "../../api/borrowing"
import { Grid, Typography } from '@mui/material';
import { Stats } from "../../utils/types";
import { Containers } from "./stats.style";

const StatsComp = () => {
    const [stats, setStats] = useState<Stats>()

    useEffect(() => {
      const fetchData = async () => {
        setStats(await getStats())
      }
      fetchData()
      
    }, [])
  
  return (
    <Grid sx={Containers}>
      
      {stats&&<Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={3}>
          <Grid  style={{ padding: 20 }}>
            <Typography variant="h6" >
              Books Borrowed Today
            </Typography>
            <Typography variant="h1">{stats.booksTodayCount}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Total Books
            </Typography>
            <Typography variant="h1">{stats.totalBooks}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Books in Library
            </Typography>
            <Typography variant="h1">{stats.booksInLib}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Books at Homes
            </Typography>
            <Typography variant="h1">{stats.booksAtHomes}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Total Borrowings
            </Typography>
            <Typography variant="h1">{stats.borrowings}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Total Readers
            </Typography>
            <Typography variant="h1">{stats.totalReaders}</Typography>
          </Grid>
        </Grid>
        
      </Grid>}
    </Grid>
  )
}
export default StatsComp




