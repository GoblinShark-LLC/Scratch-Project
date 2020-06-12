import * as types from '../constants/actionTypes';

// Set initial state
const initialState = {
  user: false,
  comments: {},
  likes: [],
  resources: [
    {
      _id: 0,
      name: '',
      url: '',
      likes: 0,
      tech: '',
      description: '',
      creayed_at: '',
      liked: false,
    },
  ],
  feed: false,
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
  let newResources; 

  switch (action.type) {
    // Update state with array of user informnation
    case types.SIGN_IN:
      return {
        ...state,
        user: action.payload.data.user,
      };
    // Update state with array of user informnation
    case types.SIGN_UP:
      return {
        ...state,
        user: action.payload.data.user,
      };
    // Update state with array of user informnation
    case types.SIGN_OUT:
      return {
        ...state,
        user: false,
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
        feed: true,
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
      newResources = [];

      for (let i = 0; i < state.resources.length; i++) {
        if (state.resources[i]._id === action.payload.resourceId) {
          const newObj = {
            ...state.resources[i],
            liked : action.payload.liked,
            likes : parseInt(state.resources[i].likes) + 1
          };
          newResources.push(newObj); 
        } else {
          newResources.push(state.resources[i])
        }
      }
      return {
        ...state,
        resources: newResources
      };
    // Update state with new number of upvotes
    case types.DOWNVOTE:
      // Backend returns an array of resource objects with the updated likes for each
      newResources = [];

      for (let i = 0; i < state.resources.length; i++) {
        if (state.resources[i]._id === action.payload.resourceId) {
          const newObj = {
            ...state.resources[i],
            liked : action.payload.liked,
            likes : parseInt(state.resources[i].likes) - 1
          };
          newResources.push(newObj); 
        } else {
          newResources.push(state.resources[i])
        }
      }
      return {
        ...state,
        resources: newResources
      };
    // add fetched comments to state
    case types.GET_COMMENTS:
      // if comments have already been pulled for this resource, update the commments array
      // if comments have not been pulled then add those comments to the state
      return {
        ...state,
        // each object in comments represent a resource, with an array of objects on each id, each element of that array reprensenting a single comment
        comments : {
          ...state.comments,
          [action.payload.resourceId] : [
            ...action.payload.comments
          ]
        }
      };
    default:
      return state;
  }
};

export default resourceReducer;
