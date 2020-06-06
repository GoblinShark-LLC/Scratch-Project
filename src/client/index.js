import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles'

render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root')
);



