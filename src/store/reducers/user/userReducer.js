import {
  ACTION_LOGIN_USER,
  ACTION_FAILED_TO_LOGIN_USER,
  ACTION_LOGOUT_USER,
  ACTION_FAILED_TO_LOGOUT_USER,
  ACTION_USER_REGISTRATION,
  ACTION_FAILED_TO_REGISTER_USER,
  ACTION_UPDATE_USER,
  ACTION_FAILED_TO_UPDATE_USER,
  ACTION_SET_USER_DATA,
  ACTION_SET_AUTH_STATUS,
  ACTION_SET_REGISTRATION_USER
} from '../../actions/user'

const initialState = {
  isAuth: false,
  isRegistered: false,
  userData: {},
  loginError: '',
  registrError: '',
  updateError: '',
  logoutError: ''
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_LOGIN_USER:
      return {
        ...state,
        loginError: ''
      }
    case ACTION_FAILED_TO_LOGIN_USER:
      return {
        ...state,
        loginError: payload
      }

    case ACTION_LOGOUT_USER:
      return {
        ...state,
        logoutError: ''
      }
    case ACTION_FAILED_TO_LOGOUT_USER:
      return {
        ...state,
        logoutError: payload
      }
    case ACTION_USER_REGISTRATION:
      return {
        ...state,
        registrError: '',
        isRegistered: false
      }

    case ACTION_FAILED_TO_REGISTER_USER:
      return {
        ...state,
        registrError: payload,
        isRegistered: false
      }
    case ACTION_UPDATE_USER:
      return {
        ...state,
        updateError: ''
      }
    case ACTION_FAILED_TO_UPDATE_USER:
      return {
        ...state,
        updateError: payload
      }
    case ACTION_SET_USER_DATA:
      return {
        ...state,
        userData: payload
      }
    case ACTION_SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: payload
      }
    case ACTION_SET_REGISTRATION_USER:
      return {
        ...state,
        isRegistered: payload
      }

    default:
      return state
  }
}
