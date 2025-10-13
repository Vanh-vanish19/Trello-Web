import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1273f3ff' }
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              color: '#1273f3ff',
              borderColor: '#1273f3ff'
            }
          }
        }
      }
    },
    dark: {
      palette: {
        primary: { main: '#1a1747ff' }
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              color: '#fff',
              borderColor: '#fff'
            }
          }
        }
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: '0.5px'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '3px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ecf0f1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#7f8c8d'
          }
        }
      }
    }
  }
})

export default theme
