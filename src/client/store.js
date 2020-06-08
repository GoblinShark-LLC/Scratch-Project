import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import resourceReducer from './reducers/resourceReducer';

const middlewares = [thunk];

// pass in our only reducer file to createStore function
// exporting a store to be used in Provider wrapping our App
const store = createStore(
  resourceReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
