import {
  SET_SOCKET,
  SET_MESSAGES,
  SET_TEMP_FRIEND_LIST,
  SET_CHATTING,
  SET_UNMOUNTING,
  SET_EMPTY_ROOM,
  SET_LOGGED_IN,
  SET_FRIEND_MODAL,
  SET_UPDATE_MODAL,
  SET_INVITE_MODAL,
  SET_VERIFY_MESSAGE,
  SET_FRIEND_MESSAGE,
  SET_WINDOW_SIZE,
  SET_INITIAL_GENERAL_STATE,
} from './types'

export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    payload: socket
  }
}

export const setMessages = (message) => {
  return {
    type: SET_MESSAGES,
    payload: message
  }
}

export const setTempFriendList = (tempFriend) => {
  return {
    type: SET_TEMP_FRIEND_LIST,
    payload: tempFriend
  }
}

export const setLoggedIn = (loggedIn) => {
  return {
    type: SET_LOGGED_IN,
    payload: loggedIn
  }
}

export const setUnmounting = (unmount) => {
  return {
    type: SET_UNMOUNTING,
    payload: unmount
  }
}

export const setChatting = (chatting) => {
  return {
    type: SET_CHATTING,
    payload: chatting
  }
}

export const setEmptyRoom = (empty) => {
  return {
    type: SET_EMPTY_ROOM,
    payload: empty
  }
}

export const setFriendModal = (friend) => {
  return {
    type: SET_FRIEND_MODAL,
    payload: friend
  }
}

export const setUpdateModal = (update) => {
  return {
    type: SET_UPDATE_MODAL,
    payload: update
  }
}

export const setInviteModal = (invite) => {
  return {
    type: SET_INVITE_MODAL,
    payload: invite
  }
}

export const setVerifyMessage = (verifyMessage) => {
  return {
    type: SET_VERIFY_MESSAGE,
    payload: verifyMessage
  }
}

export const setFriendMessage = (friendMessage) => {
  return {
    type: SET_FRIEND_MESSAGE,
    payload: friendMessage
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