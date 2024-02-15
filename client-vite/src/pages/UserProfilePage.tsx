import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import { ToReturnTable } from '../comps/userPage/ToReturnTable'
import { HistoryTable } from '../comps/userPage/HistoryTable'
import { useNavigate } from 'react-router-dom'
import { getReaderProfile } from '../api/reader'
import { ReaderInfo } from '../utils/types'
import { button, text1 } from '../comps/userPage/userPage.style'

const UserProfile = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState<ReaderInfo>()
  const navigate = useNavigate()
  document.title = userData ? `${userData.name} Profile` : `Reader Profile`

  useEffect(() => {
    const fetchData = async () => {
      setUserData(await getReaderProfile(id))
    }
    console.log(userData)

    fetchData()
  }, [])

  return (
    <Grid>
      <Container>
        {userData ? (
          <Grid>
   
            <Grid>
              <Typography variant="h4" sx={text1}>
                {userData.name}
              </Typography>
              <Typography variant="h5" sx={text1}>
                {userData.email}
              </Typography>
            </Grid>

            <Button
              sx={button}
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

            <ToReturnTable toReturn={userData.toReturn} />

            <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
            <HistoryTable history={userData.history} />
          </Grid>
        ) : (
          <Typography>-user not exist-</Typography>
        )}
      </Container>
    </Grid>
  )
}

export default UserProfile
