import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import { headerstyle } from './appbar.style'
import { pages } from './appbar.config'
import { useNavigate } from 'react-router-dom'

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
    navigate('/borrow', { replace: true, state: {} })
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
    navigate('/borrow', { replace: true, state: {} })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookmarkBorderOutlinedIcon sx={headerstyle.iconsm} />
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={headerstyle.logosm}
          >
            RuchamaLibrary
          </Typography>

          <Box sx={headerstyle.boxsm}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={headerstyle.menuitem}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component="a"
                    href={page.path}
                    color="inherit"
                  >
                    headerstylehandleCloseNavMenu {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BookmarkBorderOutlinedIcon sx={headerstyle.icon} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={headerstyle.logo}
          >
            RuchamaLibrary
          </Typography>
          <Box sx={headerstyle.box}>
            {pages.map((page) => (
              <Button
                key={page.label}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={headerstyle.link}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
