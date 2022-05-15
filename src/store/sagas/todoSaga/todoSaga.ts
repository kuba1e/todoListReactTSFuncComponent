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
import { IWebSocket } from '../../../websocket/websocket'
import { addNotification } from '../../actions/user'

type Todos = SagaReturnType<typeof fetchTodos>
type NewTodo = SagaReturnType<typeof sendToAddTodo>
type UpdatedTodo = SagaReturnType<typeof sendToUpdateTodo>
type TodosReducer = SagaReturnType<typeof todosSelector>

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

function* sendToAddTodoWorker(websocket: IWebSocket, action: ISendToAddTodo) {
  try {
    const todos: TodosReducer = yield select(todosSelector)
    const newTodo: NewTodo = yield call(sendToAddTodo, [
      action.payload,
      todos?.todosData
    ])
    yield put(addTodo(newTodo))
    const message = new Notification('add', newTodo)
    yield put(addNotification(message))

    yield websocket.events?.emit('add-todo', {
      data: newTodo,
      message
    })
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToSendToAddTodo(error.message))
    }
  }
}

function* sendToUpdateTodoWorker(
  action: ISendToUpdateTodo,
  websocket: IWebSocket
) {
  try {
    const updatedTodo: UpdatedTodo = yield call(
      sendToUpdateTodo,
      action.payload
    )
    yield put(editTodo(updatedTodo))
    const message = new Notification('edit', updatedTodo)
    yield put(addNotification(message))

    yield websocket.events?.emit('edit-todo', {
      data: updatedTodo,
      message
    })
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToUpdateTodo(error.message))
    }
  }
}

function* sendToUpdateAllTodoWorker(
  websocket: IWebSocket,
  action: ISendToUpdateAllTodo
) {
  try {
    const { todosData }: TodosReducer = yield select(todosSelector)
    yield call(sentToUpdateAllTodo, todosData)
    yield websocket.events?.emit('update-all-todo', todosData)
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToUpdateAllTodo(error.message))
    }
  }
}

function* sendToDeleteTodoWorker(websocket: IWebSocket, action: ISendToDelete) {
  try {
    yield call(sendToDeleteTodo, action.payload)
    yield put(deleteTodo(action.payload))
    const { todosData }: TodosReducer = yield select(todosSelector)
    const message = new Notification(
      'delete',
      todosData[findIndex(todosData, action.payload)]
    )
    yield websocket.events?.emit('delete-todo', {
      data: action.payload,
      message
    })
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToDeleteTodo(error.message))
    }
  }
}

function* sendToDeleteCompletedTodoWorker(
  websocket: IWebSocket,
  action: ISendToDeleteCompletedTodos
) {
  try {
    yield call(sendToDeleteCompletedTodo, action.payload)
    yield put(clearCompleted())
    yield websocket.events?.emit('delete-completed')
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

function* updateTodoWatcher(websocket: IWebSocket) {
  const channel: ActionPattern<ISendToUpdateTodo> = yield actionChannel(
    TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  )
  while (true) {
    const action: ISendToUpdateTodo = yield take(channel)
    yield call(sendToUpdateTodoWorker, action, websocket)
  }
}

function* sendToAddTodoWatcher(websocket: IWebSocket) {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_ADD_TODO,
    sendToAddTodoWorker,
    websocket
  )
}

function* sendToUpdateAllTodoWatcher(websocket: IWebSocket) {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO,
    sendToUpdateAllTodoWorker,
    websocket
  )
}

function* sendToDeleteTodoWatcher(websocket: IWebSocket) {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_TODO,
    sendToDeleteTodoWorker,
    websocket
  )
}

function* sendToDeleteCompletedTodoWatcher(websocket: IWebSocket) {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS,
    sendToDeleteCompletedTodoWorker,
    websocket
  )
}

export default function* todosSaga(websocket: IWebSocket) {
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
