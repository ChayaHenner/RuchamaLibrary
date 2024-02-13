import {  createTheme } from '@mui/material'
import { blueGrey, lightBlue } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue,
  },
  typography: {
    fontFamily: 'monospace',
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '14px',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableElevation: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '14px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontSize: '4rem',
          fontWeight: 600,
        },
        h5: {
          fontSize: '1rem',
          fontWeight: 200,
        },
        h6: {
          fontSize: '0.7rem',
          // fontWeight: 200,
        },
        h3: {
          fontSize: '1.4rem',
          fontWeight: 700,
        },
        h2: {
          fontSize: '2.3rem',
          fontWeight: 700,
        },
      },
    },
  },
})
