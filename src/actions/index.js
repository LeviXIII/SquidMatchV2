import {
    GET_USERNAME,
    GET_PASSWORD,
    GET_VERIFY_PASSWORD,
    SHOW_CREATE_BUTTON
} from './types';

export const getUsername = (username) => {
  return {
    type: GET_USERNAME,
    payload: username
  }
}

export const getPassword = (password) => {
  return {
    type: GET_PASSWORD,
    payload: password
  }
}

export const getVerifyPassword = (verifyPassword) => {
  return {
    type: GET_VERIFY_PASSWORD,
    payload: verifyPassword
  }
}

export const showCreateButton = (createButton) => {
  return {
    type: SHOW_CREATE_BUTTON,
    payload: createButton
  }
}