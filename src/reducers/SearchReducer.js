import {
  SET_SEARCH_INPUT,
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
    default:
      return state;
  };
};