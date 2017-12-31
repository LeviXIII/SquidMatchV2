import {
  SET_SOCKET,
  SET_LOGGED_IN,
  SET_INVITE_MODAL,
  SET_VERIFY_MESSAGE,
  SET_WINDOW_SIZE,
  SET_INITIAL_GENERAL_STATE,
} from '../actions/types';

const initialState = {
  socket: {},
  verifyMessage: '',
  inviteModal: false,
  isLoggedIn: false,
  windowSize: window.innerWidth,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.payload };
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_INVITE_MODAL:
      return { ...state, inviteModal: action.payload };
    case SET_VERIFY_MESSAGE:
      return { ...state, verifyMessage: action.payload };
    case SET_WINDOW_SIZE:
      return { ...state, windowSize: action.payload };
    case SET_INITIAL_GENERAL_STATE:
      return initialState;
    default:
      return state;
  };
};