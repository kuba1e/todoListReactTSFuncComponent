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
  sendToAddTodo,
  sendToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo
} from '../../asyncFoo'

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
} from '../../actions/todos'

function* fetchTodosWorker(signal) {
  try {
    const todos = yield call(fetchTodos, signal)
    yield put(successfulFetchedTodos(todos))
  } catch (error) {
    yield put(failedToFetch(error.message))
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

function* sendToUpdateTodoWorker(payload) {
  try {
    const updatedTodo = yield call(sendToUpdateTodo, payload)
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

function* fetchTodosWatcher() {
  let task
  let abortController = new AbortController()
  while (true) {
    yield take(ACTION_FETCH_TODOS)
    if (task) {
      abortController.abort()
      yield cancel(task)
      abortController = new AbortController()
    }
    task = yield fork(fetchTodosWorker, abortController.signal)
  }
}

function* updateTodoWatcher() {
  const channel = yield actionChannel(ACTION_SEND_TO_UPDATE_TODO)
  while (true) {
    const { payload } = yield take(channel)
    yield call(sendToUpdateTodoWorker, payload)
  }
}

function* sendToAddTodoWatcher() {
  yield takeEvery(ACTION_SEND_TO_ADD_TODO, sendToAddTodoWorker)
}

function* sendToUpdateAllTodoWatcher() {
  yield takeEvery(ACTION_SEND_TO_UPDATED_ALL_TODO, sendToUpdateAllTodoWorker)
}

function* sendToDeleteTodoWatcher() {
  yield takeEvery(ACTION_SEND_TO_DELETE_TODO, sendToDeleteTodoWorker)
}

function* sendToDeleteCompletedTodoWatcher() {
  yield takeEvery(
    ACTION_SEND_TO_DELETE_COMPLETED_TODOS,
    sendToDeleteCompletedTodoWorker
  )
}

export default function* todosSaga() {
  const sagas = [
    fetchTodosWatcher,
    updateTodoWatcher,
    sendToAddTodoWatcher,
    sendToUpdateAllTodoWatcher,
    sendToDeleteTodoWatcher,
    sendToDeleteCompletedTodoWatcher
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
