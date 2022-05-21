import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {
  fetchStatisticNotificationsWatcher,
  sendToDeleteNotificationWatcher
} from '../userSaga'
import {
  fetchNotifications,
  sendToDeleteNotificationFunc
} from '../../../asyncFoo'
import {
  fetchStatisticNotifications,
  fetchedStatisticNotificationsSuccessful,
  sendTodeleteNotification,
  deleteNotification,
  failedToFetchStatisticNotifications
} from '../../../actions/user'
import { INotificationReducer } from '../../../../types/notifications'
import { notificationsReducer } from '../../../reducers/user/notificationsReducer'
import { throwError } from 'redux-saga-test-plan/providers'
import { ErrorResponse } from '../../../../types/generalTypes'

describe('test notifications saga', () => {
  it('should test fetch notifications', async () => {
    const initialState: INotificationReducer = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const fakeResponse = [
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
    ]

    const { storeState } = await expectSaga(fetchStatisticNotificationsWatcher)
      .withReducer(notificationsReducer, initialState)
      .provide([[matchers.call.fn(fetchNotifications), fakeResponse]])
      .put(fetchedStatisticNotificationsSuccessful(fakeResponse))
      .dispatch(fetchStatisticNotifications())
      .silentRun()

    expect(storeState).toEqual({
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
          hidden: false,
          date: new Date('2022 02 14'),
          id: 1
        }
      ],
      loading: 'succeded',
      error: ''
    })
  })

  it('should test failed to fetch notifications', async () => {
    const initialState: INotificationReducer = {
      notifications: [],
      notificationsForStatistic: [],
      loading: 'idle',
      error: ''
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(fetchStatisticNotificationsWatcher)
      .withReducer(notificationsReducer, initialState)
      .provide([[matchers.call.fn(fetchNotifications), throwError(error)]])
      .put(failedToFetchStatisticNotifications(error.message))
      .dispatch(fetchStatisticNotifications())
      .silentRun()

    expect(storeState).toEqual({
      notifications: [],
      notificationsForStatistic: [],
      loading: 'failed',
      error: '404'
    })
  })

  it('should test send to delete notification', async () => {
    const initialState: INotificationReducer = {
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

    const { storeState } = await expectSaga(sendToDeleteNotificationWatcher)
      .withReducer(notificationsReducer, initialState)
      .provide([[matchers.call.fn(sendToDeleteNotificationFunc), 'nothing']])
      .put(deleteNotification(1))
      .dispatch(sendTodeleteNotification(1))
      .silentRun()

    expect(storeState).toEqual({
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
    })
  })
})
