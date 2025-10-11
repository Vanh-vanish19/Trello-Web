import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight : '58px',
    boardBarHeight : '48px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#87cbf9ff'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#1d1b36ff'
        }
      }
    }
  }
  // ...other properties
})

export default theme