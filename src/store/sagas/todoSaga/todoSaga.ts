import {
  put,
  call,
  takeEvery,
  take,
  cancel,
  select,
  fork,
  actionChannel,
  all,
  spawn,
  SagaReturnType,
  ActionPattern,
  StrictEffect
} from 'redux-saga/effects'
import { Task } from 'redux-saga'

import { TodosActionType } from '../../../types/todos'

import { findIndex, Notification } from '../../../helpers'

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
  failedToUpdateTodo,
  failedToSendToAddTodo,
  failedToUpdateAllTodo,
  failedToDeleteTodo,
  failedToDeleteCompletedTodos
} from '../../actions/todos'

import {
  ISendToAddTodo,
  ISendToUpdateTodo,
  ISendToUpdateAllTodo,
  ISendToDelete,
  ISendToDeleteCompletedTodos
} from '../../../types/todos'

import { ErrorResponse, InternalServerError } from '../../../types/generalTypes'

import { todosSelector } from '../../selectors'
import { addNotification } from '../../actions/user'

type Todos = SagaReturnType<typeof fetchTodos>
type NewTodo = SagaReturnType<typeof sendToAddTodo>
type UpdatedTodo = SagaReturnType<typeof sendToUpdateTodo>
type TodosReducer = SagaReturnType<typeof todosSelector>
type DeletedTodo = SagaReturnType<typeof sendToDeleteTodo>

function* fetchTodosWorker(signal: AbortSignal) {
  try {
    const todos: Todos = yield call(fetchTodos, signal)
    yield put(successfulFetchedTodos(todos))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToFetch(error.message))
    }
  }
}

function* sendToAddTodoWorker(action: ISendToAddTodo) {
  try {
    const todos: TodosReducer = yield select(todosSelector)
    const newTodo: NewTodo = yield call(sendToAddTodo, [
      action.payload,
      todos?.todosData
    ])
    yield put(addTodo(newTodo.data))
    const { type, message, id, hidden, date } = newTodo.notification
    const notificationMessage = new Notification(
      type,
      message,
      id,
      hidden,
      date
    )
    yield put(addNotification(notificationMessage))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToSendToAddTodo(error.message))
    }
  }
}

function* sendToUpdateTodoWorker(action: ISendToUpdateTodo) {
  try {
    const updatedTodo: UpdatedTodo = yield call(
      sendToUpdateTodo,
      action.payload
    )

    yield put(editTodo(updatedTodo.data))

    const { type, message, id, hidden, date } = updatedTodo.notification

    const notificationMessage = new Notification(
      type,
      message,
      id,
      hidden,
      date
    )
    yield put(addNotification(notificationMessage))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToUpdateTodo(error.message))
    }
  }
}

function* sendToUpdateAllTodoWorker(action: ISendToUpdateAllTodo) {
  try {
    const { todosData }: TodosReducer = yield select(todosSelector)
    yield call(sentToUpdateAllTodo, todosData)
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToUpdateAllTodo(error.message))
    }
  }
}

function* sendToDeleteTodoWorker(action: ISendToDelete) {
  try {
    const deletedTodo: DeletedTodo = yield call(
      sendToDeleteTodo,
      action.payload
    )
    yield put(deleteTodo(action.payload))

    const { type, message, id, hidden, date } = deletedTodo.notification
    const notificationMessage = new Notification(
      type,
      message,
      id,
      hidden,
      date
    )
    yield put(addNotification(notificationMessage))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToDeleteTodo(error.message))
    }
  }
}

function* sendToDeleteCompletedTodoWorker(action: ISendToDeleteCompletedTodos) {
  try {
    yield call(sendToDeleteCompletedTodo, action.payload)
    yield put(clearCompleted())
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToDeleteCompletedTodos(error.message))
    }
  }
}

function* fetchTodosWatcher(): Generator<StrictEffect, any, Task> {
  let task: Task | undefined
  let abortController = new AbortController()
  while (true) {
    yield take(TodosActionType.ACTION_FETCH_TODOS)
    if (task !== undefined) {
      abortController.abort()
      yield cancel(task)
      abortController = new AbortController()
    }
    task = yield fork(fetchTodosWorker, abortController.signal)
  }
}

function* updateTodoWatcher() {
  const channel: ActionPattern<ISendToUpdateTodo> = yield actionChannel(
    TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  )
  while (true) {
    const action: ISendToUpdateTodo = yield take(channel)
    yield call(sendToUpdateTodoWorker, action)
  }
}

function* sendToAddTodoWatcher() {
  yield takeEvery(TodosActionType.ACTION_SEND_TO_ADD_TODO, sendToAddTodoWorker)
}

function* sendToUpdateAllTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO,
    sendToUpdateAllTodoWorker
  )
}

function* sendToDeleteTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_TODO,
    sendToDeleteTodoWorker
  )
}

function* sendToDeleteCompletedTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS,
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
