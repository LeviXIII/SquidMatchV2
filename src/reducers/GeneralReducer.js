import {
  SET_SOCKET,
  SET_MESSAGES,
  SET_CHATTING,
  SET_LOGGED_IN,
  SET_UPDATE_MODAL,
  SET_INVITE_MODAL,
  SET_VERIFY_MESSAGE,
  SET_WINDOW_SIZE,
  SET_INITIAL_GENERAL_STATE,
} from '../actions/types';

const initialState = {
  messages: [],
  socket: {},
  verifyMessage: '',
  updateModal: false,
  inviteModal: false,
  isChatting: false,
  isLoggedIn: false,
  windowSize: window.innerWidth,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.payload };
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_CHATTING:
      return { ...state, isChatting: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: Array.from(action.payload) };
    case SET_UPDATE_MODAL:
      return { ...state, updateModal: action.payload };
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