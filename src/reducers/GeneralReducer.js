import {
  SET_LOGGED_IN,
  SET_WINDOW_SIZE,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  windowSize: window.innerWidth,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload }
    case SET_WINDOW_SIZE:
      return { ...state, windowSize: action.payload }
    default:
      return state;
  };
};