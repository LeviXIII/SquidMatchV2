import {
  SET_SEARCH_INPUT,
  SET_SEARCH_RESULTS,
  SET_INITIAL_SEARCH_STATE,
} from './types'

export const setSearchInput = ({ name, value }) => {
  return {
    type: SET_SEARCH_INPUT,
    payload: { name, value }
  }
}

export const setSearchResults = (results) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: results
  }
}

export const setInitialSearchState = () => {
  return {
    type: SET_INITIAL_SEARCH_STATE,
  }
}