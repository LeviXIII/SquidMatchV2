import {
  GET_ACCOUNT_INPUT
} from '../actions/types';

const initialState = {
  email: '',
  NSID: '',
  age: '',
  location: '',
  rank: '',
  mode: '',
  weapon: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    default:
      return state;
  };
};