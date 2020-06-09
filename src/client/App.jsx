import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';

import MainContainer from './containers/MainContainer';
import Login from './containers/LoginContainer'

// Return the App, rendering the MainContainer within it
const App = () => {

  return(
    <Router>
      <Switch>
        <Route path="/main">
          <MainContainer />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
};

export default App; 
