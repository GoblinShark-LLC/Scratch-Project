import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const myColor = blue; 

const theme = createMuiTheme({
  palette: {
    primary: myColor
  }
})

// Wrap the app in a provider tag (redux)
render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      {/* works the same as a CSS-reset */}
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
