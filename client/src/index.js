import React from 'react'
import { render } from 'react-dom'
import App from './App'

import { purple } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({  palette: {    primary: purple  }})
render(  <MuiThemeProvider theme={theme}>    <App />  </MuiThemeProvider>,  document.getElementById('root'))
