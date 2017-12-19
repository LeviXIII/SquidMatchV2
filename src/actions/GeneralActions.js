import {
  SET_LOGGED_IN,
  SET_WINDOW_SIZE,
} from './types'

export const setLoggedIn = (loggedIn) => {
  return {
    type: SET_WINDOW_SIZE,
    payload: loggedIn
  }
}

export const setWindowSize = (window) => {
  return {
    type: SET_WINDOW_SIZE,
    payload: window
  }
}