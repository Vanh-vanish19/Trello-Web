import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLLUM_HEADER_HEIGHT = '50px'
const COLLUM_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    colHeaderHeight: COLLUM_HEADER_HEIGHT,
    colFooterHeight: COLLUM_FOOTER_HEIGHT
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
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#c8d6daff',
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
