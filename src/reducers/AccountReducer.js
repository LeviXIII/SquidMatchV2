import {
  GET_ACCOUNT_INPUT,
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
  note: false,
  from: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    default:
      return state;
  };
};