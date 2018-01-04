import {
  SET_SEARCH_INPUT,
  SET_SQUAD,
  SET_SHOW_MODAL,
  SET_NEW_SEARCH_MODAL,
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

export const setSquad = (squad) => {
  return {
    type: SET_SQUAD,
    payload: squad
  }
}

export const setShowModal = (modal) => {
  return {
    type: SET_SHOW_MODAL,
    payload: modal
  }
}

export const setNewSearchModal = (newSearchModal) => {
  return {
    type: SET_NEW_SEARCH_MODAL,
    payload: newSearchModal
  }
}

export const setInitialSearchState = () => {
  return {
    type: SET_INITIAL_SEARCH_STATE,
  }
}