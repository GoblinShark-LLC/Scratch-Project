import { combineReducers } from 'redux';
import resourceReducer from './resourceReducer';

// Combine all reducers
const reducers = combineReducers({
  resources: resourceReducer,
});

export default reducers;
