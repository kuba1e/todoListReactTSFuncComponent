import { ICredentials, IUserData, IUserToUpdate } from './generalTypes'

export enum UserActionType {
  ACTION_LOGIN_USER = 'ACTION_LOGIN_USER',
  ACTION_FAILED_TO_LOGIN_USER = 'ACTION_FAILED_TO_LOGIN_USER',
  ACTION_LOGOUT_USER = 'ACTION_LOGOUT_USER',
  ACTION_FAILED_TO_LOGOUT_USER = 'ACTION_FAILED_TO_LOGOUT_USER',
  ACTION_USER_REGISTRATION = 'ACTION_USER_REGISTRATION',
  ACTION_FAILED_TO_REGISTER_USER = 'ACTION_FAILED_TO_REGISTER_USER',
  ACTION_UPDATE_USER = 'ACTION_UPDATE_USER',
  ACTION_FAILED_TO_UPDATE_USER = 'ACTION_FAILED_TO_UPDATE_USER',
  ACTION_SET_USER_DATA = 'ACTION_SET_USER_DATA',
  ACTION_SET_AUTH_STATUS = 'ACTION_SET_AUTH_STATUS',
  ACTION_SET_REGISTRATION_USER = 'ACTION_SET_REGISTRATION_USER',
  ACTION_RESET_USERS_ERROR = 'ACTION_RESET_USERS_ERROR',
  ACTION_CHECK_AUTH = 'ACTION_CHECK_AUTH'
}

export interface IUserReducer {
  isAuth: boolean
  isRegistered: boolean
  userData: IUserData
  loginError: string
  registrError: string
  updateError: string
  logoutError: string
}

export interface LoginUserAction {
  type: UserActionType.ACTION_LOGIN_USER
  payload: ICredentials
}

interface FailedToLoginAction {
  type: UserActionType.ACTION_FAILED_TO_LOGIN_USER
  payload: string
}

interface LogoutUserAction {
  type: UserActionType.ACTION_LOGOUT_USER
}

interface FailedToLogoutUserAction {
  type: UserActionType.ACTION_FAILED_TO_LOGOUT_USER
  payload: string
}

export interface UserRegistrationAction {
  type: UserActionType.ACTION_USER_REGISTRATION
  payload: ICredentials
}

interface FailedToRegisterUser {
  type: UserActionType.ACTION_FAILED_TO_REGISTER_USER
  payload: string
}

export interface UpdateUserAction {
  type: UserActionType.ACTION_UPDATE_USER
  payload: IUserToUpdate
}

interface FailedToUpdateUserAction {
  type: UserActionType.ACTION_FAILED_TO_UPDATE_USER
  payload: string
}

interface SetUserDataAction {
  type: UserActionType.ACTION_SET_USER_DATA
  payload: IUserData
}

interface SetAuthStatusAction {
  type: UserActionType.ACTION_SET_AUTH_STATUS
  payload: boolean
}

interface SetRegistrationUserAction {
  type: UserActionType.ACTION_SET_REGISTRATION_USER
  payload: boolean
}

interface ResetErrorsAction {
  type: UserActionType.ACTION_RESET_USERS_ERROR
}

export type UserAction =
  | LoginUserAction
  | FailedToLoginAction
  | LogoutUserAction
  | FailedToLogoutUserAction
  | UserRegistrationAction
  | FailedToRegisterUser
  | UpdateUserAction
  | FailedToUpdateUserAction
  | SetUserDataAction
  | SetAuthStatusAction
  | SetRegistrationUserAction
  | ResetErrorsAction
