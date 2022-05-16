import {
  put,
  call,
  takeEvery,
  all,
  spawn,
  SagaReturnType
} from 'redux-saga/effects'

import {
  loginUser,
  logoutUser,
  userRegistration,
  updateUserProfile,
  checkAuth,
  fetchNotifications,
  sendToDeleteNotification
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
  setWebsocketConnection
} from '../../actions/user'

import {
  IUpdateUserAction,
  UserActionType,
  IUserRegistrationAction,
  ILoginUserAction,
  ISendToDeleteNotification
} from '../../../types/user'

import { ErrorResponse, InternalServerError } from '../../../types/generalTypes'
import { IWebSocket } from '../../../websocket'

type UserData = SagaReturnType<typeof loginUser>
type UpdatedUser = SagaReturnType<typeof updateUserProfile>
type Notification = SagaReturnType<typeof sendToDeleteNotification>

function* loginUserWorker(websocket: IWebSocket, action: ILoginUserAction) {
  try {
    const userData: UserData = yield call(loginUser, action.payload)
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
    yield call(logoutUser)
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
    yield call(userRegistration, action.payload)
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
      updateUserProfile,
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

function* checkAuthWorker(websocket: IWebSocket) {
  try {
    const userData: UserData = yield call(checkAuth)

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

function* sendToDeleteNotificationWorker(
  websocket: IWebSocket,
  action: ISendToDeleteNotification
) {
  try {
    yield call(sendToDeleteNotification, action.payload)

    yield put(deleteNotification(action.payload))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(setWebsocketConnection(false))
    }
  }
}

function* loginUserWatcher(websocket: IWebSocket) {
  yield takeEvery(UserActionType.ACTION_LOGIN_USER, loginUserWorker, websocket)
}

function* checkAuthWatcher(websocket: IWebSocket) {
  yield takeEvery(UserActionType.ACTION_CHECK_AUTH, checkAuthWorker, websocket)
}

function* logoutUserWatcher() {
  yield takeEvery(UserActionType.ACTION_LOGOUT_USER, logoutUserWorker)
}

function* userRegistrationWatcher() {
  yield takeEvery(
    UserActionType.ACTION_USER_REGISTRATION,
    userRegistrationWorker
  )
}

function* updateUserProfileWatcher() {
  yield takeEvery(UserActionType.ACTION_UPDATE_USER, updateUserProfileWorker)
}

function* sendToDeleteNotificationWatcher(websocket: IWebSocket) {
  yield takeEvery(
    UserActionType.ACTION_SEND_TO_DELETE_NOTIFICATION,
    sendToDeleteNotificationWorker,
    websocket
  )
}

export default function* userSaga(websocket: IWebSocket) {
  const sagas = [
    loginUserWatcher,
    checkAuthWatcher,
    logoutUserWatcher,
    userRegistrationWatcher,
    updateUserProfileWatcher,
    sendToDeleteNotificationWatcher
  ]

  const retrySagas = sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga, websocket)
          break
        } catch (error) {
          console.log(error)
        }
      }
    })
  })

  yield all(retrySagas)
}
