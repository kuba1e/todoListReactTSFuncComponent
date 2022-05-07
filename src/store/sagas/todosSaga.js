import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'

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
} from '../asyncFoo'

import {
  successfulFetchedTodos,
  failedToFetch,
  addTodo,
  editTodo,
  deleteTodo,
  clearCompleted,
  toggleAllDoneTodo,
  failedToUpdateTodo,
  failedToSendToAddTodo,
  failedToUpdateAllTodo,
  failedToDeleteTodo,
  failedToDeleteCompletedTodos,
  ACTION_FETCH_TODOS,
  ACTION_SEND_TO_ADD_TODO,
  ACTION_SEND_TO_UPDATE_TODO,
  ACTION_SEND_TO_UPDATED_ALL_TODO,
  ACTION_SEND_TO_DELETE_TODO,
  ACTION_SEND_TO_DELETE_COMPLETED_TODOS
} from '../actions/todos'

import {
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser,
  setUserData,
  setAuthStatus,
  ACTION_LOGIN_USER,
  ACTION_CHECK_AUTH,
  ACTION_LOGOUT_USER,
  ACTION_USER_REGISTRATION,
  ACTION_UPDATE_USER
} from '../actions/user'

function* fetchTodosWorker() {
  try {
    const todos = yield call(fetchTodos)
    yield put(successfulFetchedTodos(todos))
  } catch (error) {
    yield put(failedToFetch(error.message))
  }
}

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

function* sendToAddTodoWorker(action) {
  try {
    const newTodo = yield call(sendToAddTodo, action.payload)
    yield put(addTodo(newTodo))
  } catch (error) {
    yield put(failedToSendToAddTodo(error.message))
  }
}

function* sendToUpdateTodoWorker(action) {
  try {
    const updatedTodo = yield call(sendToUpdateTodo, action.payload)
    yield put(editTodo(updatedTodo))
  } catch (error) {
    yield put(failedToUpdateTodo(error.message))
  }
}

function* sendToUpdateAllTodoWorker(action) {
  try {
    yield call(sentToUpdateAllTodo, action.payload)
    yield put(toggleAllDoneTodo(action.payload))
  } catch (error) {
    yield put(failedToUpdateAllTodo(error.message))
  }
}

function* sendToDeleteTodoWorker(action) {
  try {
    yield call(sendToDeleteTodo, action.payload)
    yield put(deleteTodo(action.payload))
  } catch (error) {
    yield put(failedToDeleteTodo(error.message))
  }
}

function* sendToDeleteCompletedTodoWorker(action) {
  try {
    yield call(sendToDeleteCompletedTodo, action.payload)
    yield put(clearCompleted())
  } catch (error) {
    yield put(failedToDeleteCompletedTodos(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest(ACTION_FETCH_TODOS, fetchTodosWorker)
  yield takeEvery(ACTION_LOGIN_USER, loginUserWorker)
  yield takeEvery(ACTION_CHECK_AUTH, checkAuthWorker)
  yield takeEvery(ACTION_LOGOUT_USER, logoutUserWorker)
  yield takeEvery(ACTION_SEND_TO_ADD_TODO, sendToAddTodoWorker)
  yield takeEvery(ACTION_SEND_TO_UPDATE_TODO, sendToUpdateTodoWorker)
  yield takeEvery(ACTION_SEND_TO_UPDATED_ALL_TODO, sendToUpdateAllTodoWorker)
  yield takeEvery(ACTION_SEND_TO_DELETE_TODO, sendToDeleteTodoWorker)
  yield takeEvery(
    ACTION_SEND_TO_DELETE_COMPLETED_TODOS,
    sendToDeleteCompletedTodoWorker
  )
  yield takeEvery(ACTION_USER_REGISTRATION, userRegistrationWorker)
  yield takeEvery(ACTION_UPDATE_USER, updateUserProfileWorker)
}
