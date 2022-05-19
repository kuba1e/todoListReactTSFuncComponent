import { action } from 'typesafe-actions'
import { INotification } from '../../../types/generalTypes'
import { WebsocketActionType } from '../../../types/websocket'
import { NotificationsAtionType } from '../../../types/notifications'

import {
  ICredentials,
  IUserData,
  IUserToUpdate
} from '../../../types/generalTypes'
import { UserActionType } from '../../../types/user'

export const loginUser = (data: ICredentials) =>
  action(UserActionType.ACTION_LOGIN_USER, data)

export const failedToLoginUser = (error: string) =>
  action(UserActionType.ACTION_FAILED_TO_LOGIN_USER, error)

export const logoutUser = () => action(UserActionType.ACTION_LOGOUT_USER)

export const failedToLogoutUser = (error: string) =>
  action(UserActionType.ACTION_FAILED_TO_LOGOUT_USER, error)

export const userRegistration = (data: ICredentials) =>
  action(UserActionType.ACTION_USER_REGISTRATION, data)

export const failedToRegisterUser = (error: string) =>
  action(UserActionType.ACTION_FAILED_TO_REGISTER_USER, error)

export const updateUser = (data: IUserToUpdate) =>
  action(UserActionType.ACTION_UPDATE_USER, data)

export const failedToUpdateUser = (error: string) =>
  action(UserActionType.ACTION_FAILED_TO_UPDATE_USER, error)

export const setUserData = (userData: IUserData) =>
  action(UserActionType.ACTION_SET_USER_DATA, userData)

export const setRegistrationUser = (isRegistered: boolean) =>
  action(UserActionType.ACTION_SET_REGISTRATION_USER, isRegistered)

export const setAuthStatus = (status: boolean) =>
  action(UserActionType.ACTION_SET_AUTH_STATUS, status)

export const checkAuth = () => action(UserActionType.ACTION_CHECK_AUTH)

export const resetUserErrors = () =>
  action(UserActionType.ACTION_RESET_USERS_ERROR)

export const setWebsocketConnection = (status: boolean) =>
  action(WebsocketActionType.ACTION_SET_WEBSOCKET_CONNECTION, status)

export const addNotification = (notification: INotification) =>
  action(NotificationsAtionType.ACTION_ADD_NOTIFICATION, notification)

export const deleteNotification = (notificationId: number) =>
  action(NotificationsAtionType.ACTION_DELETE_NOTIFICATION, notificationId)

export const getNotifications = (notification: INotification[]) =>
  action(NotificationsAtionType.ACTION_GET_NOTIFICATIONS, notification)

export const sendTodeleteNotification = (notificationId: number) =>
  action(
    NotificationsAtionType.ACTION_SEND_TO_DELETE_NOTIFICATION,
    notificationId
  )

export const fetchStatisticNotifications = () =>
  action(NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS)

export const fetchedStatisticNotificationsSuccessful = (
  notifications: INotification[]
) =>
  action(
    NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS_SUCCESSFUL,
    notifications
  )

export const failedToFetchStatisticNotifications = (error: string) =>
  action(
    NotificationsAtionType.ACTION_FAILED_TO_FETCH_STATISTIC_NOTIFICATIONS,
    error
  )
