import {
    GET_USERNAME
} from './types';

export const getUsername = (username) => {
  return {
    type: GET_USERNAME,
    payload: username
  }
}