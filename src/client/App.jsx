import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { CssBaseline } from '@material-ui/core';

import MainContainer from './containers/MainContainer';
import UserLogin from './containers/UserLogin';
import UserSignUp from './containers/UserSignUp';

const myColor = blue; 

const theme = createMuiTheme({
  palette: {
    primary: myColor
  }
})

// Return the App, rendering the MainContainer within it
const App = ({store}) => {

  return(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      {/* works the same as a CSS-reset */}
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={MainContainer}/>
            {/* <Route exact path="/login" component={UserLogin}/> */}
            {/* <Route exact path="/signup" component={UserSignUp}/>  */}
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
};
App.propTypes = {store: PropTypes.object.isRequired};

export default App; 
