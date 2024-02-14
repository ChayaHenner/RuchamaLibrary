import { FC } from 'react'
import { HeaderProps } from '../../utils/types'
import { Grid, Typography } from '@mui/material'
import { headerstyle } from './appbar.style'

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <Grid   alignItems="center" sx={headerstyle.header}>
          <Typography variant="h2">{title}</Typography>
      </Grid>
    </>
  )
}
export default Header
