import { deleteNotification } from '../../../helpers'

import {
  INotificationReducer,
  NotificationsAction,
  NotificationsAtionType
} from '../../../types/notifications'

const initialState: INotificationReducer = {
  notifications: [],
  notificationsForStatistic: [],
  loading: 'idle',
  error: ''
}

export const notificationsReducer = (
  state = initialState,
  action: NotificationsAction
) => {
  switch (action.type) {
    case NotificationsAtionType.ACTION_ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }

    case NotificationsAtionType.ACTION_DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: deleteNotification(state.notifications, action.payload)
      }

    case NotificationsAtionType.ACTION_GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload]
      }

    case NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS:
      return {
        ...state,
        loading: 'pending'
      }

    case NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS_SUCCESSFUL:
      return {
        ...state,
        loading: 'succeded',
        notificationsForStatistic: action.payload
      }
    case NotificationsAtionType.ACTION_FAILED_TO_FETCH_STATISTIC_NOTIFICATIONS:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      }

    default:
      return state
  }
}
