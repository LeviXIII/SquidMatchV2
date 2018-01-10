import {
  GET_LOGIN_INPUT,  
  SET_MATCHING_PASSWORD,
  SHOW_CREATE_BUTTON,
  SET_INITIAL_LOGIN_STATE,
} from '../actions/types';

const initialState = {
  username: '',
  password: '',
  verifyPassword: '',
  verified: false,
  createButton: false,
  matchingPassword: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    case SET_MATCHING_PASSWORD:
      return { ...state, matchingPassword: action.payload };
    case SHOW_CREATE_BUTTON:
      return { ...state, createButton: action.payload };
    case SET_INITIAL_LOGIN_STATE:
      return initialState;
    default:
      return state;
  };
};