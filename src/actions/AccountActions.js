import {
  GET_ACCOUNT_INPUT,
  SET_INITIAL_ACCOUNT_STATE
} from './types';

export const getAccountInput = ({ name, value }) => {
  return {
    type: GET_ACCOUNT_INPUT,
    payload: { name, value }
  }
}

export const setInitialAccountState = () => {
  return {
    type: SET_INITIAL_ACCOUNT_STATE,
  }
}