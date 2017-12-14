import {
  GET_USERNAME,
  GET_PASSWORD,
  GET_VERIFY_PASSWORD,
  SHOW_CREATE_BUTTON
} from '../actions/types';

const initialState = {
  username: '',
  password: '',
  verifyPassword: '',
  createButton: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, username: action.payload };
    case GET_PASSWORD:
      return { ...state, password: action.payload };
    case GET_VERIFY_PASSWORD:
      return { ...state, verifyPassword: action.payload };
    case SHOW_CREATE_BUTTON:
      return { ...state, createButton: action.payload };
    default:
      return state;
  };
};