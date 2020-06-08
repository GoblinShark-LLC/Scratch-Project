import axios from 'axios';
import * as types from '../constants/actionsTypes';

const resources;
// Send get request to server for resource based on name param
export const getResource = (resource) => {
  return (dispatch) => {
    axios
      .get('http://localhost:3000/resource/', resource.params)
      .then((response) => {
        dispatch({
          type: types.GET_RESOURCE,
          payload: response.data,
        });
      });
  };
};

// Send post request to server to add a new resource
export const addResource = () => {
  return (dispatch) => {
    axios
      .post('http://localhost:3000/resource/', resource.params)
      .then((response) => {
        dispatch({
          type: types.ADD_RESOURCE,
          payload: response.data,
        });
      });
  };
};

// Send put request to increase like count
export const addLike = () => {
  return (dispatch) => {
    axios
      .put('http://localhost:3000/resource/upvote', resource.params)
      .then((response) => {
        dispatch({
          type: types.UPVOTE,
          payload: response.data,
        });
      });
  };
};
// Send put request to increase like count
export const downvote = () => {
  return (dispatch) => {
    axios
      .put('http://localhost:3000/resource/downvote', resource.params)
      .then((response) => {
        dispatch({
          type: types.DOWNVOTE,
          payload: response.data,
        });
      });
  };
};
