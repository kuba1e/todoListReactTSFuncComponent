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
  checkAuth
} from '../../asyncFoo'

import {
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser,
  setUserData,
  setAuthStatus,
  setRegistrationUser
} from '../../actions/user'

import {
  UpdateUserAction,
  UserActionType,
  UserRegistrationAction,
  LoginUserAction
} from '../../../types/user'

import { ErrorResponse, InternalServerError } from '../../../types/generalTypes'

type UserData = SagaReturnType<typeof loginUser>
type UpdatedUser = SagaReturnType<typeof updateUserProfile>

function* loginUserWorker(action: LoginUserAction) {
  try {
    const userData: UserData = yield call(loginUser, action.payload)
    yield put(setUserData(userData.user))
    yield put(setAuthStatus(true))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      console.log(error)
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

function* userRegistrationWorker(action: UserRegistrationAction) {
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

function* updateUserProfileWorker(action: UpdateUserAction) {
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

function* checkAuthWorker() {
  try {
    const userData: UserData = yield call(checkAuth)
    yield put(setUserData(userData.user))
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

function* loginUserWatcher() {
  yield takeEvery(UserActionType.ACTION_LOGIN_USER, loginUserWorker)
}

function* checkAuthWatcher() {
  yield takeEvery(UserActionType.ACTION_CHECK_AUTH, checkAuthWorker)
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

export default function* userSaga() {
  const sagas = [
    loginUserWatcher,
    checkAuthWatcher,
    logoutUserWatcher,
    userRegistrationWatcher,
    updateUserProfileWatcher
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
