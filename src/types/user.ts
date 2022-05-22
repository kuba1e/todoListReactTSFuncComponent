import {
  ICredentials,
  IUserData,
  IUserToUpdate,
  IUnknownAction
} from './generalTypes'

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
  loading: string
  userData: IUserData
  loginError: string
  registrError: string
  updateError: string
  logoutError: string
}

export interface ILoginUserAction {
  type: UserActionType.ACTION_LOGIN_USER
  payload: ICredentials
}

export interface IFailedToLoginAction {
  type: UserActionType.ACTION_FAILED_TO_LOGIN_USER
  payload: string
}

export interface ILogoutUserAction {
  type: UserActionType.ACTION_LOGOUT_USER
}

export interface IFailedToLogoutUserAction {
  type: UserActionType.ACTION_FAILED_TO_LOGOUT_USER
  payload: string
}

export interface IUserRegistrationAction {
  type: UserActionType.ACTION_USER_REGISTRATION
  payload: ICredentials
}

export interface IFailedToRegisterUser {
  type: UserActionType.ACTION_FAILED_TO_REGISTER_USER
  payload: string
}

export interface IUpdateUserAction {
  type: UserActionType.ACTION_UPDATE_USER
  payload: IUserToUpdate
}

export interface IFailedToUpdateUserAction {
  type: UserActionType.ACTION_FAILED_TO_UPDATE_USER
  payload: string
}

export interface ISetUserDataAction {
  type: UserActionType.ACTION_SET_USER_DATA
  payload: IUserData
}

export interface ISetAuthStatusAction {
  type: UserActionType.ACTION_SET_AUTH_STATUS
  payload: boolean
}

export interface ISetRegistrationUserAction {
  type: UserActionType.ACTION_SET_REGISTRATION_USER
  payload: boolean
}

export interface IResetErrorsAction {
  type: UserActionType.ACTION_RESET_USERS_ERROR
}

export type UserAction =
  | ILoginUserAction
  | IFailedToLoginAction
  | ILogoutUserAction
  | IFailedToLogoutUserAction
  | IUserRegistrationAction
  | IFailedToRegisterUser
  | IUpdateUserAction
  | IFailedToUpdateUserAction
  | ISetUserDataAction
  | ISetAuthStatusAction
  | ISetRegistrationUserAction
  | IResetErrorsAction
  | IUnknownAction
