import { notificationsReducer } from '../notificationsReducer'
import {
  addNotification,
  deleteNotification,
  failedToFetchStatisticNotifications,
  fetchedStatisticNotificationsSuccessful,
  fetchStatisticNotifications,
  getNotifications
} from '../../../actions/user'

describe('test notification reducer', () => {
  it('should handle return initial state ', () => {
    const initialState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    expect(notificationsReducer(undefined, { type: '', payload: '' })).toEqual(
      initialState
    )
  })

  it('should handle notification  added to list', () => {
    const previousState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      notifications: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: false,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    expect(
      notificationsReducer(
        previousState,
        addNotification({
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: false,
          date: new Date('2022 02 14'),
          id: 1
        })
      )
    ).toEqual(nextState)
  })

  it('should handle notification  deleted from list', () => {
    const previousState = {
      notifications: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: false,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      notifications: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: true,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    expect(notificationsReducer(previousState, deleteNotification(1))).toEqual(
      nextState
    )
  })

  it('should handle notification  deleted from empty ist', () => {
    const previousState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    expect(notificationsReducer(previousState, deleteNotification(1))).toEqual(
      nextState
    )
  })

  it('should handle notification  gotten to empty list', () => {
    const previousState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      notifications: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: true,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    expect(
      notificationsReducer(
        previousState,
        getNotifications([
          {
            type: 'add',
            message: {
              id: 1,
              label: 'test',
              done: false,
              order_num: 2
            },
            hidden: true,
            date: new Date('2022 02 14'),
            id: 1
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('should handle notification  gotten to list', () => {
    const previousState = {
      notifications: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: true,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      notifications: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: true,
          date: new Date('2022 02 14'),
          id: 1
        },
        {
          type: 'delete',
          message: {
            id: 2,
            label: 'test2',
            done: true,
            order_num: 3
          },
          hidden: true,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    expect(
      notificationsReducer(
        previousState,
        getNotifications([
          {
            type: 'add',
            message: {
              id: 1,
              label: 'test',
              done: false,
              order_num: 2
            },
            hidden: true,
            date: new Date('2022 02 14'),
            id: 1
          },
          {
            type: 'delete',
            message: {
              id: 2,
              label: 'test2',
              done: true,
              order_num: 3
            },
            hidden: true,
            date: new Date('2022 02 14'),
            id: 1
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('should handle notifications  fetched', () => {
    const previousState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'pending',
      error: ''
    }

    expect(
      notificationsReducer(previousState, fetchStatisticNotifications())
    ).toEqual(nextState)
  })

  it('should handle notifications have been fetched successful', () => {
    const previousState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      notifications: [],
      notificationsForStatistic: [
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: true,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      loading: 'succeded',
      error: ''
    }

    expect(
      notificationsReducer(
        previousState,
        fetchedStatisticNotificationsSuccessful([
          {
            type: 'add',
            message: {
              id: 1,
              label: 'test',
              done: false,
              order_num: 2
            },
            hidden: true,
            date: new Date('2022 02 14'),
            id: 1
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('should handle notifications have been fetched unsuccessful', () => {
    const previousState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'failed',
      error: '404'
    }

    expect(
      notificationsReducer(
        previousState,
        failedToFetchStatisticNotifications('404')
      )
    ).toEqual(nextState)
  })
})
