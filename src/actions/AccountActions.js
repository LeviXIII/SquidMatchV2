import {
  GET_ACCOUNT_INPUT
} from './types';

export const getAccountInput = ({ name, value }) => {
  return {
    type: GET_ACCOUNT_INPUT,
    payload: { name, value }
  }
}