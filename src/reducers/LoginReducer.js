import {
  GET_LOGIN_INPUT,  
  GET_MATCHING_PASSWORD,
  SET_VERIFY_MESSAGE,
  SHOW_CREATE_BUTTON,
} from '../actions/types';

const initialState = {
  username: '',
  password: '',
  verifyPassword: '',
  verifyMessage: '',
  createButton: false,
  matchingPassword: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    case GET_MATCHING_PASSWORD:
      return { ...state, matchingPassword: action.payload };
    case SET_VERIFY_MESSAGE:
      return { ...state, verifyMessage: action.payload };
    case SHOW_CREATE_BUTTON:
      return { ...state, createButton: action.payload };
    default:
      return state;
  };
};