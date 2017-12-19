import {
  GET_ACCOUNT_INPUT,
  SET_WINDOW_SIZE
} from '../actions/types';

const initialState = {
  email: '',
  NSID: '',
  age: '< 19',
  location: 'Canada',
  rank: 'C',
  mode: 'Turf War',
  weapon: 'Shooters',
  status: 'Available',
  windowSize: window.innerWidth
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    case SET_WINDOW_SIZE:
      return { ...state, windowSize: action.payload }
    default:
      return state;
  };
};