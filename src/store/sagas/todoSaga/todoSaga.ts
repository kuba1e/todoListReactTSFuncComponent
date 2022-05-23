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

import {
  fetchTodosFunc,
  sendToAddTodoFunc,
  sendToUpdateTodoFunc,
  sendToUpdateAllTodoFunc,
  sendToDeleteTodoFunc,
  sendToDeleteCompletedTodoFunc
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
  ISendToDelete,
  ISendToDeleteCompletedTodos
} from '../../../types/todos'

import { ErrorResponse, InternalServerError } from '../../../types/generalTypes'

import { todosSelector } from '../../selectors'
import { addNotification } from '../../actions/user'

type Todos = SagaReturnType<typeof fetchTodosFunc>
export type NewTodo = SagaReturnType<typeof sendToAddTodoFunc>
type UpdatedTodo = SagaReturnType<typeof sendToUpdateTodoFunc>
type TodosReducer = SagaReturnType<typeof todosSelector>
export type DeletedTodo = SagaReturnType<typeof sendToDeleteTodoFunc>

export function* fetchTodosWorker(signal: AbortSignal) {
  try {
    const todos: Todos = yield call(fetchTodosFunc, signal)
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
    const newTodo: NewTodo = yield call(sendToAddTodoFunc, [
      action.payload,
      todos?.todosData
    ])
    yield put(addTodo(newTodo.data))

    yield put(addNotification(newTodo.notification))
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
      sendToUpdateTodoFunc,
      action.payload
    )

    yield put(editTodo(updatedTodo.data))

    yield put(addNotification(updatedTodo.notification))
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToUpdateTodo(error.message))
    }
  }
}

function* sendToUpdateAllTodoWorker() {
  try {
    const { todosData }: TodosReducer = yield select(todosSelector)
    yield call(sendToUpdateAllTodoFunc, todosData)
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
      sendToDeleteTodoFunc,
      action.payload
    )

    console.log(deletedTodo)
    yield put(deleteTodo(action.payload))

    yield put(addNotification(deletedTodo.notification))
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
    console.log('clear completed success')

    yield call(sendToDeleteCompletedTodoFunc, action.payload)
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

export function* fetchTodosWatcher(): Generator<StrictEffect, any, Task> {
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

export function* updateTodoWatcher() {
  const channel: ActionPattern<ISendToUpdateTodo> = yield actionChannel(
    TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  )
  while (true) {
    const action: ISendToUpdateTodo = yield take(channel)
    yield call(sendToUpdateTodoWorker, action)
  }
}

export function* sendToAddTodoWatcher() {
  yield takeEvery(TodosActionType.ACTION_SEND_TO_ADD_TODO, sendToAddTodoWorker)
}

export function* sendToUpdateAllTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO,
    sendToUpdateAllTodoWorker
  )
}

export function* sendToDeleteTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_TODO,
    sendToDeleteTodoWorker
  )
}

export function* sendToDeleteCompletedTodoWatcher() {
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
