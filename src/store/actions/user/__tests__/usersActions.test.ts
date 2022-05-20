import { faker } from '@faker-js/faker'

import {
  ICredentials,
  INotification,
  IUserData,
  IUserToUpdate
} from 'types/generalTypes'
import { NotificationsAtionType } from '../../../../types/notifications'

import { UserActionType } from '../../../../types/user'
import { WebsocketActionType } from '../../../../types/websocket'
import {
  addNotification,
  checkAuth,
  deleteNotification,
  failedToFetchStatisticNotifications,
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser,
  fetchedStatisticNotificationsSuccessful,
  fetchStatisticNotifications,
  getNotifications,
  loginUser,
  logoutUser,
  resetUserErrors,
  setAuthStatus,
  setRegistrationUser,
  setUserData,
  setWebsocketConnection,
  updateUser,
  userRegistration
} from '../usersActions'

describe('test user actions', () => {
  it('should test login user', () => {
    const credentials: ICredentials = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const actionReturnValue = loginUser(credentials)

    expect(actionReturnValue.type).toEqual(UserActionType.ACTION_LOGIN_USER)
    expect(actionReturnValue.payload).toEqual(credentials)
  })

  it('should test failed to login user', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToLoginUser(error)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_FAILED_TO_LOGIN_USER
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test  logout user', () => {
    const actionReturnValue = logoutUser()

    expect(actionReturnValue.type).toEqual(UserActionType.ACTION_LOGOUT_USER)
  })

  it('should test failed to login user', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToLogoutUser(error)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_FAILED_TO_LOGOUT_USER
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test user registration', () => {
    const credentials: ICredentials = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const actionReturnValue = userRegistration(credentials)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_USER_REGISTRATION
    )
    expect(actionReturnValue.payload).toEqual(credentials)
  })

  it('should test failed to register user', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToRegisterUser(error)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_FAILED_TO_REGISTER_USER
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test user update', () => {
    const credentials: IUserToUpdate = {
      email: faker.internet.email(),
      oldPassword: faker.internet.password(),
      newPassword: faker.internet.password(),
      id: faker.random.numeric()
    }

    const actionReturnValue = updateUser(credentials)

    expect(actionReturnValue.type).toEqual(UserActionType.ACTION_UPDATE_USER)
    expect(actionReturnValue.payload).toEqual(credentials)
  })

  it('should test failed to update user', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToUpdateUser(error)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_FAILED_TO_UPDATE_USER
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test set user data', () => {
    const userData: IUserData = {
      email: faker.internet.email(),
      id: faker.random.numeric(),
      isActivated: false
    }

    const actionReturnValue = setUserData(userData)

    expect(actionReturnValue.type).toEqual(UserActionType.ACTION_SET_USER_DATA)
    expect(actionReturnValue.payload).toEqual(userData)
  })

  it('should test set registration user', () => {
    const isRegistered = true

    const actionReturnValue = setRegistrationUser(isRegistered)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_SET_REGISTRATION_USER
    )
    expect(actionReturnValue.payload).toEqual(isRegistered)
  })

  it('should test set authentification status', () => {
    const isAuth = true

    const actionReturnValue = setAuthStatus(isAuth)

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_SET_AUTH_STATUS
    )
    expect(actionReturnValue.payload).toEqual(isAuth)
  })

  it('should test check user authentification', () => {
    const actionReturnValue = checkAuth()

    expect(actionReturnValue.type).toEqual(UserActionType.ACTION_CHECK_AUTH)
  })

  it('should test reset user errors', () => {
    const actionReturnValue = resetUserErrors()

    expect(actionReturnValue.type).toEqual(
      UserActionType.ACTION_RESET_USERS_ERROR
    )
  })

  it('should test set websocket connection', () => {
    const isConnected = true

    const actionReturnValue = setWebsocketConnection(isConnected)

    expect(actionReturnValue.type).toEqual(
      WebsocketActionType.ACTION_SET_WEBSOCKET_CONNECTION
    )
    expect(actionReturnValue.payload).toEqual(isConnected)
  })

  it('should test add notification', () => {
    const notification: INotification = {
      type: faker.random.word(),
      message: {
        id: faker.mersenne.rand(),
        label: faker.random.word(),
        done: false,
        order_num: faker.mersenne.rand()
      },
      hidden: false,
      date: faker.date.past(),
      id: faker.mersenne.rand()
    }

    const actionReturnValue = addNotification(notification)

    expect(actionReturnValue.type).toEqual(
      NotificationsAtionType.ACTION_ADD_NOTIFICATION
    )
    expect(actionReturnValue.payload).toEqual(notification)
  })

  it('should test delete notification', () => {
    const notificationId = faker.mersenne.rand()

    const actionReturnValue = deleteNotification(notificationId)

    expect(actionReturnValue.type).toEqual(
      NotificationsAtionType.ACTION_DELETE_NOTIFICATION
    )
    expect(actionReturnValue.payload).toEqual(notificationId)
  })

  it('should test get notification', () => {
    const notifications = []
    for (let i = 0; i <= 20; i++) {
      const notification: INotification = {
        type: faker.random.word(),
        message: {
          id: faker.mersenne.rand(),
          label: faker.random.word(),
          done: false,
          order_num: faker.mersenne.rand()
        },
        hidden: false,
        date: faker.date.past(),
        id: faker.mersenne.rand()
      }

      notifications.push(notification)
    }

    const actionReturnValue = getNotifications(notifications)

    expect(actionReturnValue.type).toEqual(
      NotificationsAtionType.ACTION_GET_NOTIFICATIONS
    )
    expect(actionReturnValue.payload).toEqual(notifications)
  })

  it('should test fetch statistic notifications', () => {
    const actionReturnValue = fetchStatisticNotifications()

    expect(actionReturnValue.type).toEqual(
      NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS
    )
  })

  it('should test fetch statistic notifications successful', () => {
    const notifications = []
    for (let i = 0; i <= 20; i++) {
      const notification: INotification = {
        type: faker.random.word(),
        message: {
          id: faker.mersenne.rand(),
          label: faker.random.word(),
          done: false,
          order_num: faker.mersenne.rand()
        },
        hidden: false,
        date: faker.date.past(),
        id: faker.mersenne.rand()
      }

      notifications.push(notification)
    }

    const actionReturnValue =
      fetchedStatisticNotificationsSuccessful(notifications)

    expect(actionReturnValue.type).toEqual(
      NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS_SUCCESSFUL
    )
    expect(actionReturnValue.payload).toEqual(notifications)
  })

  it('should test failed to fetch statistic notifications', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToFetchStatisticNotifications(error)

    expect(actionReturnValue.type).toEqual(
      NotificationsAtionType.ACTION_FAILED_TO_FETCH_STATISTIC_NOTIFICATIONS
    )
    expect(actionReturnValue.payload).toEqual(error)
  })
})
