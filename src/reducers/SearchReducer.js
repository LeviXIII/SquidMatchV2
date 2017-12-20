import {
  SET_SEARCH_INPUT,
  SET_INITIAL_SEARCH_STATE,
} from '../actions/types';

const initialState = {
  searchAge: 'Any',
  searchLocation: 'Any',
  searchRank: 'Any',
  searchMode: 'Any',
  searchWeapon: 'Any',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    case SET_INITIAL_SEARCH_STATE:
      return initialState;
    default:
      return state;
  };
};