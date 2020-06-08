import axios from 'axios';
import * as types from '../constants/actionTypes';

// Send get request to server for resource (tech name) based on name param
export const getResource = (resource) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/resource/${resource.toLowerCase()}`)
      .then((response) => {
        dispatch({
          type: types.GET_RESOURCE,
          payload: response.data,
        });
      });
  };
};

// COMMENTS
export const updateTopic = (topic) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TOPIC,
      payload: topic,
    });
  };
};

// Send post request to server to add a new resource
export const addResource = (resource) => {
  console.log('In the addResource front end:      ', resource);
  return (dispatch) => {
    axios
      .post(`http://localhost:3000/resource/${resource.name}`, resource)
      .then((response) => {
        dispatch({
          type: types.ADD_RESOURCE,
          payload: response.data,
        });
      });
  };
};

// Send put request to increase like count
export const upvote = (id, tech) => {
  console.log('This is the id you from the front end     ', id);
  return (dispatch) => {
    axios
      .put('http://localhost:3000/resource/upvote', { id: id, tech: tech })
      .then((response) => {
        dispatch({
          type: types.UPVOTE,
          payload: response.data,
        });
      });
  };
};

// Send put request to increase like count
export const downvote = (id, tech) => {
  return (dispatch) => {
    axios
      .put('http://localhost:3000/resource/downvote', { id: id, tech: tech })
      .then((response) => {
        dispatch({
          type: types.DOWNVOTE,
          payload: response.data,
        });
      });
  };
};
