import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import Router from './Router'
import { CssBaseline } from '@mui/material'
import { responsiveFontSizes } from '@mui/material/styles'
import { Header } from './component'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { Colors } from './constant'

let theme = createTheme({
  typography: {
    fontFamily: "LeferiBaseType-Regular"
  },
  palette: {
    primary: { main: Colors.primary, light: Colors.primary_lighter },
    secondary: { main: Colors.dark, light: Colors.light, dark: Colors.darker},
  }
})
theme = responsiveFontSizes(theme)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
