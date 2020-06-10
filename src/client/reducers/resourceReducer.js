import * as types from '../constants/actionTypes';

// Set initial state
const initialState = {
  resources: [
    {
      name: '',
      id: 0,
      likes: 0,
      url: '',
      description: '',
      liked: false,
    },
  ],
  currentTopic: 'Javascript',
  topics: [],
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Update state with array of topics
    case types.GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    // Update state with array of resources
    case types.GET_RESOURCE:
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with array of resources
    case types.UPDATE_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
      };
    // Update state with array of resources after adding one
    case types.ADD_RESOURCE:
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with new number of upvotes
    case types.UPVOTE:
      // Backend returns an array of resource objects with the updated likes for each
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with new number of upvotes
    case types.DOWNVOTE:
      // Backend returns one an array of resource objects with updated likes for each
      return {
        ...state,
        resources: action.payload,
      };
    default:
      return state;
  }
};

export default resourceReducer;
