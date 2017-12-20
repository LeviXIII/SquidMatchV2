import {
  SET_LOGGED_IN,
  SET_VERIFY_MESSAGE,
  SET_WINDOW_SIZE,
  SET_INITIAL_GENERAL_STATE,
} from './types'

export const setLoggedIn = (loggedIn) => {
  return {
    type: SET_LOGGED_IN,
    payload: loggedIn
  }
}

export const setVerifyMessage = (verifyMessage) => {
  return {
    type: SET_VERIFY_MESSAGE,
    payload: verifyMessage
  }
}

export const setWindowSize = (window) => {
  return {
    type: SET_WINDOW_SIZE,
    payload: window
  }
}

export const setInitialGeneralState = () => {
  return {
    type: SET_INITIAL_GENERAL_STATE,
  }
}