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
  ACTION_SET_AUTH_STATUS
} from '../../actions/user'

const initialState = {
  isAuth: false,
  userData: {},
  loginError: '',
  registrError: '',
  updateError: '',
  logoutError: ''
}

export const userReducer = (state, { type, payload }) => {
  if (state === undefined) {
    return {
      isAuth: false,
      userData: {},
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }
  }

  switch (type) {
    case ACTION_LOGIN_USER:
      return {
        ...state.user,
        loginError: ''
      }
    case ACTION_FAILED_TO_LOGIN_USER:
      return {
        ...state.user,
        loginError: payload
      }

    case ACTION_LOGOUT_USER:
      return {
        ...state.user,
        logoutError: ''
      }
    case ACTION_FAILED_TO_LOGOUT_USER:
      return {
        ...state.user,
        logoutError: payload
      }
    case ACTION_USER_REGISTRATION:
      return {
        ...state.user,
        registrError: ''
      }

    case ACTION_FAILED_TO_REGISTER_USER:
      return {
        ...state.user,
        registrError: payload
      }
    case ACTION_UPDATE_USER:
      return {
        ...state.user,
        updateError: ''
      }
    case ACTION_FAILED_TO_UPDATE_USER:
      return {
        ...state.user,
        updateError: payload
      }
    case ACTION_SET_USER_DATA:
      return {
        ...state.user,
        userData: payload
      }
    case ACTION_SET_AUTH_STATUS:
      return {
        ...state.user,
        isAuth: payload
      }

    default:
      return state.user
  }
}
