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
        primary: { main: '#90caf9' },
        secondary: { main: '#b0bec5' },
        background: {
          default: '#0a1929',
          paper: '#1a2027'
        },
        text: {
          primary: '#fff',
          secondary: '#b0bec5'
        }
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              color: 'white',
              borderColor: 'white'
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
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '1px' }
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
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          },
          '[data-mui-color-scheme="dark"] &': {
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: '#4f5b62'
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#90caf9'
            }
          }
        }
      }
    }
  }
})

export default theme