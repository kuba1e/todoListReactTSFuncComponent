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
  it('handle return initial state ', () => {
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

  it('handle notification being added to list', () => {
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
          date: new Date(),
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
          date: new Date(),
          id: 1
        })
      )
    ).toEqual(nextState)
  })

  it('handle notification being deleted from list', () => {
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
          date: new Date(),
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
          date: new Date(),
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

  it('handle notification being deleted from empty ist', () => {
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

  it('handle notification being gotten to empty list', () => {
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
          date: new Date(),
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
            date: new Date(),
            id: 1
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('handle notification being gotten to list', () => {
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
          date: new Date(),
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
          date: new Date(),
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
          date: new Date(),
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
            date: new Date(),
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
            date: new Date(),
            id: 1
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('handle notifications being fetched', () => {
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

  it('handle notifications have been fetched successful', () => {
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
          date: new Date(),
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
            date: new Date(),
            id: 1
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('handle notifications have been fetched unsuccessful', () => {
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
