import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import 'formol/lib/default.css'
import { Provider } from './Context'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://6ae03774cdff4bfabdbcd523e89d61b0@sentry.io/1726112'
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008483'
    },
    secondary: {
      main: '#D3AF37'
    },
    common: { black: '#000', white: '#fff' },
    grey: { light: '#f5f5f5', main: '#e3e3e3' }
  }
})

ReactDOM.render(
  <Provider>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  </Provider>,

  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
