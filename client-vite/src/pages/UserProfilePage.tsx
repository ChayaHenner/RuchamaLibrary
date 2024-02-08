import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import { ToReturnTable } from '../comps/toReturnTable'
import { HistoryTable } from '../comps/historyTable'
import { Link, useNavigate } from 'react-router-dom'
import { getReaderProfile } from '../api/reader'
import { ReaderInfo } from '../utils/types'

const UserProfile = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState<ReaderInfo>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserData(await getReaderProfile(id))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    console.log(userData)

    fetchData()
  }, [])

  return (
    <Grid>
      <Container>
        {userData ? (
          <>
            <Typography variant="h4" sx={{ m: 1 }}>
              {userData.name}
            </Typography>
            <Typography variant="h5" sx={{ m: 1 }}>
              {userData.email}
            </Typography>
         
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/borrow', {
                  state: { id: userData.id, name: userData.name },
                })
              }}
            >
              Borrow
            </Button>

            <Typography variant="h3" sx={{ m: 2 }}>
              Books to return
            </Typography>
            {userData.toReturn ? (
              <ToReturnTable toReturn={userData.toReturn} />
            ) : (
              <Typography>-none-</Typography>
            )}
            <Divider sx={{ marginTop: 10 }} />
            <Typography variant="h3" sx={{ m: 2 }}>
              Books History
            </Typography>
            {userData.history ? (
              <HistoryTable history={userData.history} />
            ) : (
              <Typography>-none-</Typography>
            )}
          </>
        ) : (
          <Typography>-user not exist-</Typography>
        )}
      </Container>
    </Grid>
  )
}

export default UserProfile
