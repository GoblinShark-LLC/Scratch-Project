import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import store from './store';
import { Provider } from 'react-redux';

render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);
