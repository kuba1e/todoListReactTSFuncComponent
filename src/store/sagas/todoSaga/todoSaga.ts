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
import { Socket } from 'socket.io'

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

function* sendToAddTodoWorker(websocket: Socket, action: ISendToAddTodo) {
  try {
    const todos: TodosReducer = yield select(todosSelector)
    console.log(action.payload)
    const newTodo: NewTodo = yield call(sendToAddTodo, [
      action.payload,
      todos?.todosData
    ])
    yield put(addTodo(newTodo))
    websocket.emit('add-todo', newTodo)
  } catch (error) {
    if (
      error instanceof ErrorResponse ||
      error instanceof InternalServerError
    ) {
      yield put(failedToSendToAddTodo(error.message))
    }
  }
}

function* sendToUpdateTodoWorker(action: ISendToUpdateTodo, websocket: Socket) {
  try {
    console.log(websocket)
    const updatedTodo: UpdatedTodo = yield call(
      sendToUpdateTodo,
      action.payload
    )
    yield put(editTodo(updatedTodo))
    console.log(updatedTodo)

    websocket.emit('edit-todo', updatedTodo)
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

function* sendToDeleteTodoWorker(websocket: Socket, action: ISendToDelete) {
  try {
    yield call(sendToDeleteTodo, action.payload)
    yield put(deleteTodo(action.payload))
    websocket.emit('delete-todo', action.payload)
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

function* updateTodoWatcher(websocket: Socket) {
  const channel: ActionPattern<ISendToUpdateTodo> = yield actionChannel(
    TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  )
  while (true) {
    const action: ISendToUpdateTodo = yield take(channel)
    yield call(sendToUpdateTodoWorker, action, websocket)
  }
}

function* sendToAddTodoWatcher(websocket: Socket) {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_ADD_TODO,
    sendToAddTodoWorker,
    websocket
  )
}

function* sendToUpdateAllTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO,
    sendToUpdateAllTodoWorker
  )
}

function* sendToDeleteTodoWatcher(websocket: Socket) {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_TODO,
    sendToDeleteTodoWorker,
    websocket
  )
}

function* sendToDeleteCompletedTodoWatcher() {
  yield takeEvery(
    TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS,
    sendToDeleteCompletedTodoWorker
  )
}

export default function* todosSaga(websocket: Socket) {
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
