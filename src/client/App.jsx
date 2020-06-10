import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';

import MainContainer from './containers/MainContainer';

// Return the App, rendering the MainContainer within it
const App = () => {

  return (
    <Switch>

      <Route path="/">
        <MainContainer />
      </Route>

    </Switch>
  )
};

export default App; 
