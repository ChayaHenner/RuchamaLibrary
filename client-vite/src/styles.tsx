import { styled } from '@mui/system';
import { Card, createTheme } from '@mui/material';
import { CustomCardProps } from './types';
import { blueGrey, lightBlue } from '@mui/material/colors';

export const CustomCard = styled(Card)<CustomCardProps>(({ inLib, categoryColor }) => ({
    backgroundColor: inLib ? '#f309a' : '#f5f5f5',
    minHeight: 220,
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(0, 0, 0.2, 0.1)',
    },
    height: 200, position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '5px',
      height: '100%',
      backgroundColor: categoryColor == 'Teens' ? 'lightblue' : (categoryColor == 'Adults' ? 'salmon' : (categoryColor == 'Children' ? 'yellow' : 'lightgreen')),
    },
  }));

  export const theme = createTheme({
    palette:{
      primary: blueGrey,
      secondary: lightBlue
    },
    typography:{
      fontFamily:'monospace',
      
    },
      components:{
        MuiCardContent:{
          styleOverrides:{
            root:{
              padding:"14px"
            }
          }
        },

        MuiButton:{
          defaultProps:{
            disableFocusRipple:true,
            disableElevation:true,
            disableTouchRipple:true
          },
          styleOverrides:{
            root:{
              padding:"14px"
            }
          }
        },
        MuiTypography:{
          styleOverrides:{
            h4: { 
              fontSize: '4rem',  
              fontWeight: 600,
            },
            h5: { 
              fontSize: '1rem',  
              fontWeight: 200,
            },
            h6: { 
              fontSize: '2rem',  
              fontWeight: 200,
            },
            h3: { 
              fontSize: '1.4rem',  
              fontWeight: 700,
            },
            
          }
        }
      }
  })
