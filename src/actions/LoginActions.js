import {
  GET_LOGIN_INPUT,
  GET_MATCHING_PASSWORD,
  SET_VERIFY_MESSAGE,
  SHOW_CREATE_BUTTON
} from './types';

export const getLoginInput = ({ name, value }) => {
  return {
    type: GET_LOGIN_INPUT,
    payload: { name, value }
  }
}

export const getMatchingPassword = (matchingPassword) => {
  return {
    type: GET_MATCHING_PASSWORD,
    payload: matchingPassword
  }
}

export const setVerifyMessage = (verifyMessage) => {
  return {
    type: SET_VERIFY_MESSAGE,
    payload: verifyMessage
  }
}

export const showCreateButton = (createButton) => {
  return {
    type: SHOW_CREATE_BUTTON,
    payload: createButton
  }
}