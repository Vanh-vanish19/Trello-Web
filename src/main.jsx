import CssBaseline from '@mui/material/CssBaseline'
//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { store } from '~/redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: true,
        dialogProps: { maxWidth: 'xs' },
        buttonOrder: ['confirm', 'cancel']
      }}>
        <CssBaseline />
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
)
