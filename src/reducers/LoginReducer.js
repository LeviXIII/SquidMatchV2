import {
  GET_USERNAME
} from '../actions/types';

const initialState = {
  username: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, username: action.payload };
    default:
      return state;
  };
};