import {
  put,
  call,
  takeEvery,
  all,
  spawn,
  SagaReturnType
} from 'redux-saga/effects'

import {
  loginUserFunc,
  logoutUserFunc,
  userRegistrationFunc,
  updateUserProfileFunc,
  checkAuthFunc,
  fetchNotifications,
  sendToDeleteNotificationFunc
} from '../../asyncFoo'

import {
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser,
  setUserData,
  setAuthStatus,
  setRegistrationUser,
  getNotifications,
  deleteNotification,
  fetchedStatisticNotificationsSuccessful,
  failedToFetchStatisticNotifications
} from '../../actions/user'

import {
  IUpdateUserAction,
  UserActionType,
  IUserRegistrationAction,
  ILoginUserAction
} from '../../../types/user'

import { NotificationsAtionType } from '../../../types/notifications'
import { ISendToDeleteNotification } from '../../../types/notifications'

import { ErrorResponse, InternalServerError } from '../../../types/generalTypes'
import { websocket } from '../../store'

export type UserData = SagaReturnType<typeof loginUserFunc>
type UpdatedUser = SagaReturnType<typeof updateUserProfileFunc>
export type Notifications = SagaReturnType<typeof fetchNotifications>

function* loginUserWorker(action: ILoginUserAction) {
  try {
    const userData: UserData = yield call(loginUserFunc, action.payload)
    yield put(getNotifications(userData.notifications))
    websocket.connectSocket()
    yield put(setUserData(userData.userInfo.user))
    yield put(setAuthStatus(true))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToLoginUser(error.message))
    }
  }
}

function* logoutUserWorker() {
  try {
    yield call(logoutUserFunc)
    yield put(setAuthStatus(false))
    yield put(setUserData({ id: '', email: '', isActivated: false }))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToLogoutUser(error.message))
    }
  }
}

function* userRegistrationWorker(action: IUserRegistrationAction) {
  try {
    yield call(userRegistrationFunc, action.payload)
    yield put(setRegistrationUser(true))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToRegisterUser(error.message))
    }
  }
}

function* updateUserProfileWorker(action: IUpdateUserAction) {
  try {
    const updatedUser: UpdatedUser = yield call(
      updateUserProfileFunc,
      action.payload
    )
    yield put(setUserData(updatedUser))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToUpdateUser(error.message))
    }
  }
}

function* checkAuthWorker() {
  try {
    const userData: UserData = yield call(checkAuthFunc)

    yield put(getNotifications(userData.notifications))

    yield call(websocket.connectSocket)

    yield put(setUserData(userData.userInfo.user))
    yield put(setAuthStatus(true))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(setAuthStatus(false))
    }
  }
}

function* sendToDeleteNotificationWorker(action: ISendToDeleteNotification) {
  try {
    yield call(sendToDeleteNotificationFunc, action.payload)
    yield put(deleteNotification(action.payload))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToFetchStatisticNotifications(error.message))
    }
  }
}

function* fetchStatisticNotificatiosWorker() {
  try {
    const notifications: Notifications = yield call(fetchNotifications)
    yield put(fetchedStatisticNotificationsSuccessful(notifications))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToFetchStatisticNotifications(error.message))
    }
  }
}

export function* loginUserWatcher() {
  yield takeEvery(UserActionType.ACTION_LOGIN_USER, loginUserWorker)
}

export function* checkAuthWatcher() {
  yield takeEvery(UserActionType.ACTION_CHECK_AUTH, checkAuthWorker)
}

export function* logoutUserWatcher() {
  yield takeEvery(UserActionType.ACTION_LOGOUT_USER, logoutUserWorker)
}

export function* userRegistrationWatcher() {
  yield takeEvery(
    UserActionType.ACTION_USER_REGISTRATION,
    userRegistrationWorker
  )
}

export function* updateUserProfileWatcher() {
  yield takeEvery(UserActionType.ACTION_UPDATE_USER, updateUserProfileWorker)
}

export function* sendToDeleteNotificationWatcher() {
  yield takeEvery(
    NotificationsAtionType.ACTION_SEND_TO_DELETE_NOTIFICATION,
    sendToDeleteNotificationWorker
  )
}

export function* fetchStatisticNotificationsWatcher() {
  yield takeEvery(
    NotificationsAtionType.ACTION_FETCH_STATISTIC_NOTIFICATIONS,
    fetchStatisticNotificatiosWorker
  )
}

export default function* userSaga() {
  const sagas = [
    loginUserWatcher,
    checkAuthWatcher,
    logoutUserWatcher,
    userRegistrationWatcher,
    updateUserProfileWatcher,
    sendToDeleteNotificationWatcher,
    fetchStatisticNotificationsWatcher
  ]

  const retrySagas = sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (error) {
          console.log(error)
        }
      }
    })
  })

  yield all(retrySagas)
}
