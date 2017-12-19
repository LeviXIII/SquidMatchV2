import {
  GET_ACCOUNT_INPUT, SET_WINDOW_SIZE,
} from './types';

export const getAccountInput = ({ name, value }) => {
  return {
    type: GET_ACCOUNT_INPUT,
    payload: { name, value }
  }
}

export const setWindowSize = (window) => {
  return {
    type: SET_WINDOW_SIZE,
    payload: window
  }
}