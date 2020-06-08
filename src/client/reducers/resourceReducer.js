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
  topics: [
    'Javascript',
    'React',
    'Redux',
    'Angular',
    'Vue',
    'MongoDB',
    'Jest',
    'Enzyme',
    'Puppeteer',
    'Typescript',
    'Node',
    'Express',
  ],
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
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
      console.log(
        'Im in the add resource front end this is your payload:     ',
        action.payload
      );
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with new number of upvotes
    case types.UPVOTE:
      // Backend returns onei object with the updated like count
      // Do we want all resources in a tech instead?
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with new number of upvotes
    case types.DOWNVOTE:
      // Backend returns one object with the updated like count
      // Do we want all resources in a tech instead?
      return {
        ...state,
        resources: action.payload,
      };
    default:
      return state;
  }
};

export default resourceReducer;
