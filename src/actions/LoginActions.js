import {
  GET_LOGIN_INPUT,
  SET_MATCHING_PASSWORD,
  SHOW_CREATE_BUTTON,
  SET_INITIAL_LOGIN_STATE,
} from './types';

export const getLoginInput = ({ name, value }) => {
  return {
    type: GET_LOGIN_INPUT,
    payload: { name, value }
  }
}

export const setMatchingPassword = (matchingPassword) => {
  return {
    type: SET_MATCHING_PASSWORD,
    payload: matchingPassword
  }
}

export const showCreateButton = (createButton) => {
  return {
    type: SHOW_CREATE_BUTTON,
    payload: createButton
  }
}

export const setInitialLoginState = () => {
  return {
    type: SET_INITIAL_LOGIN_STATE,
  }
}