import { FC } from 'react'
import { HeaderProps } from '../../utils/types'
import { Grid, Typography } from '@mui/material'
import { headerstyle } from './appbar.style'

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <Grid container spacing={3} alignItems="center" sx={headerstyle.header}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
      </Grid>
    </>
  )
}
export default Header
