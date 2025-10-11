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
          main: '#064e7eff'
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color : theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main
        })
      }
    }
  }
})

export default theme