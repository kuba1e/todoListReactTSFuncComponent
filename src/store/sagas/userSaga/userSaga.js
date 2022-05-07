import {
  put,
  call,
  takeEvery,
  take,
  cancel,
  fork,
  actionChannel,
  all,
  spawn
} from 'redux-saga/effects'

import {
  fetchTodos,
  loginUser,
  logoutUser,
  userRegistration,
  updateUserProfile,
  checkAuth,
  sendToAddTodo,
  sendToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo
} from '../../asyncFoo'

import {
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser,
  setUserData,
  setAuthStatus,
  setRegistrationUser,
  ACTION_LOGIN_USER,
  ACTION_CHECK_AUTH,
  ACTION_LOGOUT_USER,
  ACTION_USER_REGISTRATION,
  ACTION_UPDATE_USER
} from '../../actions/user'

function* loginUserWorker(action) {
  try {
    const userData = yield call(loginUser, action.payload)
    yield put(setUserData(userData.user))
    yield put(setAuthStatus(true))
  } catch (error) {
    yield put(failedToLoginUser(error.message))
  }
}

function* logoutUserWorker() {
  try {
    yield call(logoutUser)
    yield put(setAuthStatus(false))
    yield put(setUserData({}))
  } catch (error) {
    yield put(failedToLogoutUser(error.message))
  }
}

function* userRegistrationWorker(action) {
  try {
    yield call(userRegistration, action.payload)
    yield put(setRegistrationUser(true))
  } catch (error) {
    yield put(failedToRegisterUser(error.message))
  }
}

function* updateUserProfileWorker(action) {
  try {
    const updatedUser = yield call(updateUserProfile, action.payload)
    yield put(setUserData(updatedUser))
  } catch (error) {
    yield put(failedToUpdateUser(error.message))
  }
}

function* checkAuthWorker() {
  try {
    const userData = yield call(checkAuth)
    yield put(setUserData(userData.user))
    yield put(setAuthStatus(true))
  } catch (error) {
    yield put(setAuthStatus(false))
  }
}

function* loginUserWatcher() {
  yield takeEvery(ACTION_LOGIN_USER, loginUserWorker)
}

function* checkAuthWatcher() {
  yield takeEvery(ACTION_CHECK_AUTH, checkAuthWorker)
}

function* logoutUserWatcher() {
  yield takeEvery(ACTION_LOGOUT_USER, logoutUserWorker)
}

function* userRegistrationWatcher() {
  yield takeEvery(ACTION_USER_REGISTRATION, userRegistrationWorker)
}

function* updateUserProfileWatcher() {
  yield takeEvery(ACTION_UPDATE_USER, updateUserProfileWorker)
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
