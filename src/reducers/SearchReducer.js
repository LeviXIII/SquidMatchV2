import {
  SET_SEARCH_INPUT,
  SET_SQUAD,
  SET_SEARCH_RESULTS,
  SET_SHOW_MODAL,
  SET_INITIAL_SEARCH_STATE,
} from '../actions/types';

const initialState = {
  searchAge: 'Any',
  searchLocation: 'Any',
  searchRank: 'Any',
  searchMode: 'Any',
  searchWeapon: 'Any',
  searchResults: [],
  squad: [],
  showModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, [action.payload.name]: action.payload.value }
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload }
    case SET_SQUAD:
      return { ...state, squad: Array.from(action.payload) }
    case SET_SHOW_MODAL:
      return { ...state, showModal: action.payload }
    case SET_INITIAL_SEARCH_STATE:
      return initialState;
    default:
      return state;
  };
};