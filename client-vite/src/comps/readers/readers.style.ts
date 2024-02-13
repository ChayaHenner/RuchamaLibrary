import { styled } from '@mui/system'
import { Card } from '@mui/material'
import { CustomCardProps } from '../../utils/types'

export const readerstyle = {
  button: {
    position: 'fixed',
    top: '100px',
    right: '100px',
    zIndex: 1000,
  },
  textfield: {
    margin: 1,
    width: 250,
  },
  boxblur: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backdropFilter: 'blur(10px)',
    background: 'rgba(128, 128, 128, 0.4)',
  },
  inlinetypo: { display: 'inline' },
  cardreader: { height: '100%', display: 'flex', flexDirection: 'column' },
  //text:{ textDecoration: 'none', color: 'inherit' }
  text: {
    borderRadius: '90%', 
    padding: '15px', 
    transition: 'background-color 0.7s ', 
    textAlign: 'right', // Aligns the buttons to the right

  },
}

export const CustomCard = styled(Card)<CustomCardProps>(
  ({ inLib, categoryColor }) => ({
    backgroundColor: inLib ? '#f309a' : '#f5f5f5',
    minHeight: 220,
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(0, 0, 0.2, 0.1)',
    },
    height: 200,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '5px',
      height: '100%',
      backgroundColor:
        categoryColor == 'Teens'
          ? 'lightblue'
          : categoryColor == 'Adults'
            ? 'salmon'
            : categoryColor == 'Children'
              ? 'yellow'
              : 'lightgreen',
    },
  }),
)
