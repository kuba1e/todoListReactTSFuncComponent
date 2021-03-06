import { IUserReducer, UserAction, UserActionType } from '../../../types/user'

const initialState: IUserReducer = {
  isAuth: false,
  isRegistered: false,
  loading: 'idle',
  userData: {
    id: '',
    email: '',
    isActivated: false
  },
  loginError: '',
  registrError: '',
  updateError: '',
  logoutError: ''
}

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.ACTION_LOGIN_USER:
      return {
        ...state,
        loginError: ''
      }
    case UserActionType.ACTION_FAILED_TO_LOGIN_USER:
      return {
        ...state,
        loginError: action.payload
      }

    case UserActionType.ACTION_LOGOUT_USER:
      return {
        ...state,
        logoutError: ''
      }
    case UserActionType.ACTION_FAILED_TO_LOGOUT_USER:
      return {
        ...state,
        userData: {
          id: '',
          email: '',
          isActivated: false
        },
        logoutError: action.payload
      }
    case UserActionType.ACTION_USER_REGISTRATION:
      return {
        ...state,
        registrError: '',
        isRegistered: false
      }

    case UserActionType.ACTION_FAILED_TO_REGISTER_USER:
      return {
        ...state,
        registrError: action.payload,
        isRegistered: false
      }
    case UserActionType.ACTION_UPDATE_USER:
      return {
        ...state,
        updateError: ''
      }
    case UserActionType.ACTION_FAILED_TO_UPDATE_USER:
      return {
        ...state,
        updateError: action.payload
      }
    case UserActionType.ACTION_SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      }
    case UserActionType.ACTION_SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: action.payload
      }
    case UserActionType.ACTION_SET_REGISTRATION_USER:
      return {
        ...state,
        isRegistered: action.payload
      }
    case UserActionType.ACTION_RESET_USERS_ERROR:
      return {
        ...state,
        loginError: '',
        registrError: '',
        updateError: '',
        logoutError: ''
      }
    default:
      return state
  }
}
