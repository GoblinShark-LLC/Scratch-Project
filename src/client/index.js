import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store';


// Wrap the app in a provider tag (redux)
render(
  <App store={store}/>,
  document.getElementById('root')
);