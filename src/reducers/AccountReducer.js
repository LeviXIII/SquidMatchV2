import {
  GET_ACCOUNT_INPUT,
  SET_INITIAL_ACCOUNT_STATE,
} from '../actions/types';

const initialState = {
  email: '',
  NSID: '',
  age: '< 19',
  location: 'Canada',
  rank: 'C',
  mode: 'Turf War',
  weapon: 'Shooters',
  playstyle: 'Casual',
  status: 'Available',
  notify: false,
  from: '',
  friendlist: [],
  avatar: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_INPUT:
      return { ...state, [action.payload.name]: action.payload.value };
    case SET_INITIAL_ACCOUNT_STATE:
      return initialState;
    default:
      return state;
  };
};