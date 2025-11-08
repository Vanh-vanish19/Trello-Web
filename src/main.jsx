import CssBaseline from '@mui/material/CssBaseline'
//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
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
  //</React.StrictMode>
)
