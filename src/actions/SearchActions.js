import {
  SET_SEARCH_INPUT
} from './types'

export const setSearchInput = ({ name, value }) => {
  console.log({name, value});
  return {
    type: SET_SEARCH_INPUT,
    payload: { name, value }
  }
}