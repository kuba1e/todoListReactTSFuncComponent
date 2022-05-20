import { INotification, UnknownAction } from './generalTypes'

export enum NotificationsAtionType {
  ACTION_ADD_NOTIFICATION = 'ACTION_ADD_NOTIFICATION',
  ACTION_DELETE_NOTIFICATION = 'ACTION_DELETE_NOTIFICATION',
  ACTION_GET_NOTIFICATIONS = 'ACTION_GET_NOTIFICATIONS',
  ACTION_SEND_TO_DELETE_NOTIFICATION = 'ACTION_SEND_TO_DELETE_NOTIFICATION',
  ACTION_FETCH_STATISTIC_NOTIFICATIONS = 'ACTION_FETCH_STATISTIC_NOTIFICATIONS',
  ACTION_FETCH_STATISTIC_NOTIFICATIONS_SUCCESSFUL = 'ACTION_FETCH_STATISTIC_NOTIFICATIONS_SUCCESSFUL',
  ACTION_FAILED_TO_FETCH_STATISTIC_NOTIFICATIONS = 'ACTION_FAILED_TO_FETCH_STATISTIC_NOTIFICATIONS'
}

export interface INotificationReducer {
  notifications: INotification[] | []
  notificationsForStatistic: INotification[] | []
  loading: string
  error: string
}

interface IAddNotification {
  type: NotificationsAtionType.ACTION_ADD_NOTIFICATION
  payload: INotification
}

interface IDeleteNotification {
  type: NotificationsAtionType.ACTION_DELETE_NOTIFICATION
  payload: number
}

interface IGetNotifications {
  type: NotificationsAtionType.ACTION_GET_NOTIFICATIONS
  payload: INotification[]
}

export interface ISendToDeleteNotification {
  type: NotificationsAtionType.ACTION_SEND_TO_DELETE_NOTIFICATION
  payload: number
}

export interface IFetchStatisticNotifications {
  type: NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS
}
export interface IFetchedStatisticNotificationSuccessful {
  type: NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS_SUCCESSFUL
  payload: INotification[]
}

export interface IFailedToFetchStaticticNotifications {
  type: NotificationsAtionType.ACTION_FAILED_TO_FETCH_STATISTIC_NOTIFICATIONS
  payload: string
}

export type NotificationsAction =
  | IAddNotification
  | IDeleteNotification
  | IGetNotifications
  | IFetchedStatisticNotificationSuccessful
  | IFetchStatisticNotifications
  | UnknownAction
  | IFailedToFetchStaticticNotifications
