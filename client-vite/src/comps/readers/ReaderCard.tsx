import { Grid, Card, CardContent, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { FC } from 'react'
import { ReaderCardProp } from '../../utils/types'
import { readerstyle } from './readers.style'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { patchDeleteReader } from '../../api/reader'
import Swal from 'sweetalert2'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
const ReaderCard: FC<ReaderCardProp> = ({ reader }) => {
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return age - 1
    }
    return age
  }

  const deleteReader = async () => {
    try {
      await patchDeleteReader(reader.id)
      Swal.fire({
        title: ' Deleted!',
        text: 'Reader no longer has account',
        icon: 'success',
        confirmButtonText: 'confirm',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } catch {
      Swal.fire({
        title: 'Cant Delete',
        text: 'Reader has books at home',
        icon: 'warning',
      })
    }
  }
  return (
    <>
      <Grid key={reader.id} item xs={12} sm={6} md={4} lg={4}>
        <Card sx={readerstyle.cardreader}>
          <CardContent>
            <Typography
              variant="h3"
              component="div"
              style={readerstyle.inlinetypo}
            >
              {reader.name}
            </Typography>
            <Typography
              color="textSecondary"
              style={readerstyle.inlinetypo}
            ></Typography>
            <Typography color="textSecondary">{reader.email}</Typography>
            <Typography color="textSecondary">
              age: {calculateAge(reader.dob)}
            </Typography>
            <Button
              component={Link}
              to={`/profile/${reader.id}`}
              sx={readerstyle.text}
            >
              <AccountCircleRoundedIcon />
            </Button>
            <Button onClick={deleteReader} sx={readerstyle.text}>
              <DeleteRoundedIcon />
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
export default ReaderCard
