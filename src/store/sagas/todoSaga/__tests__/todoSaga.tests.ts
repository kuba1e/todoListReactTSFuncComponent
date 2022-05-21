import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as matchers from 'redux-saga-test-plan/matchers'

import {
  sendToAddTodoFunc,
  sendToDeleteTodoFunc,
  sendToUpdateTodoFunc,
  sendToUpdateAllTodoFunc,
  sendToDeleteCompletedTodoFunc,
  fetchTodosFunc
} from '../../../asyncFoo'
import { todosSelector } from '../../../selectors/selectors'

import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  failedToDeleteCompletedTodos,
  failedToDeleteTodo,
  failedToFetch,
  failedToSendToAddTodo,
  failedToUpdateAllTodo,
  failedToUpdateTodo,
  fetchTodos,
  sendToAddTodo,
  sendToDeleteCompletedTodos,
  sendToDeleteTodo,
  sendToUpdateAllTodo,
  sendToUpdateTodo,
  successfulFetchedTodos
} from '../../../actions/todos'
import {
  NewTodo,
  sendToAddTodoWatcher,
  sendToDeleteTodoWatcher,
  updateTodoWatcher,
  sendToUpdateAllTodoWatcher,
  sendToDeleteCompletedTodoWatcher,
  fetchTodosWatcher
} from '../todoSaga'

import { addNotification } from '../../../actions/user'
import rootReducer from '../../../reducers'
import { RootState } from '../../../reducers/rootReducer'
import { TodosActionType, ITodosReducer } from '../../../../types/todos'
import { todosReducer } from '../../../reducers/todos/todosReducer'
import { ErrorResponse } from '../../../../types/generalTypes'

describe('test todos root saga', () => {
  it('should test send to add todo', async () => {
    const initialState: RootState = {
      todos: {
        todosData: {
          todosData: [],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    }

    const newTodo: NewTodo = {
      data: {
        id: 2,
        label: 'test',
        order_num: 2,
        done: false
      },
      notification: {
        type: 'add',
        id: 1,
        message: {
          id: 2,
          label: 'test',
          order_num: 2,
          done: false
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    }

    const { storeState } = await expectSaga(sendToAddTodoWatcher)
      .withReducer(rootReducer, initialState)
      .provide([[matchers.call.fn(sendToAddTodoFunc), newTodo]])
      .select(todosSelector)
      .put(addTodo(newTodo.data))
      .put(addNotification(newTodo.notification))
      .dispatch(sendToAddTodo('test'))
      .run()

    expect(storeState).toEqual({
      todos: {
        todosData: {
          todosData: [
            {
              id: 2,
              label: 'test',
              order_num: 2,
              done: false
            }
          ],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [
            {
              type: 'add',
              id: 1,
              message: {
                id: 2,
                label: 'test',
                order_num: 2,
                done: false
              },
              hidden: false,
              date: new Date('2022-03-05')
            }
          ],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    })
  })

  it('should test failed to send to add todos', async () => {
    const initialState: RootState = {
      todos: {
        todosData: {
          todosData: [],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(sendToAddTodoWatcher)
      .withReducer(rootReducer, initialState)
      .provide([[matchers.call.fn(sendToAddTodoFunc), throwError(error)]])
      .put(failedToSendToAddTodo(error.message))
      .dispatch(sendToAddTodo('test'))
      .silentRun()

    expect(storeState).toEqual({
      todos: {
        todosData: {
          todosData: [],
          loading: 'failed',
          error: '404'
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    })
  })

  it('should test delete todo', async () => {
    const initialState: RootState = {
      todos: {
        todosData: {
          todosData: [
            {
              id: 1,
              label: 'test',
              order_num: 1,
              done: false
            }
          ],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    }

    const deletedTodo = {
      data: {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      notification: {
        type: 'delete',
        id: 1,
        message: {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    }
    const { storeState } = await expectSaga(sendToDeleteTodoWatcher)
      .withReducer(rootReducer, initialState)
      .provide([[matchers.call.fn(sendToDeleteTodoFunc), deletedTodo]])
      .put(deleteTodo(1))
      .put(addNotification(deletedTodo.notification))
      .dispatch(sendToDeleteTodo(1))
      .silentRun()

    expect(storeState).toEqual({
      todos: {
        todosData: {
          todosData: [],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [
            {
              type: 'delete',
              id: 1,
              message: {
                id: 1,
                label: 'test',
                order_num: 1,
                done: false
              },
              hidden: false,
              date: new Date('2022-03-05')
            }
          ],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    })
  })

  it('should test failed to delete todo', async () => {
    const initialState: RootState = {
      todos: {
        todosData: {
          todosData: [
            {
              id: 2,
              label: 'test',
              order_num: 2,
              done: false
            }
          ],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(sendToDeleteTodoWatcher)
      .withReducer(rootReducer, initialState)
      .provide([[matchers.call.fn(sendToDeleteTodoFunc), throwError(error)]])
      .put(failedToDeleteTodo(error.message))
      .dispatch(sendToDeleteTodo(2))
      .silentRun()

    expect(storeState).toEqual({
      todos: {
        todosData: {
          todosData: [
            {
              id: 2,
              label: 'test',
              order_num: 2,
              done: false
            }
          ],
          loading: 'failed',
          error: '404'
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    })
  })

  it('should test update todo', async () => {
    const initialState: RootState = {
      todos: {
        todosData: {
          todosData: [
            {
              id: 1,
              label: 'test',
              order_num: 1,
              done: false
            }
          ],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    }

    const updatedTodo = {
      data: {
        id: 1,
        label: 'updated',
        order_num: 2,
        done: true
      },

      notification: {
        type: 'edit',
        id: 1,
        message: {
          id: 1,
          label: 'updated',
          order_num: 2,
          done: true
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    }
    const { storeState } = await expectSaga(updateTodoWatcher)
      .withReducer(rootReducer, initialState)
      .provide([
        [matchers.call.fn(sendToUpdateTodoFunc), updatedTodo],
        [
          matchers.actionChannel.pattern(
            TodosActionType.ACTION_SEND_TO_UPDATE_TODO
          ),
          TodosActionType.ACTION_SEND_TO_UPDATE_TODO
        ],
        matchers.take(TodosActionType.ACTION_SEND_TO_UPDATE_TODO)
      ])
      .put(editTodo(updatedTodo.data))
      .put(addNotification(updatedTodo.notification))
      .dispatch(
        sendToUpdateTodo({
          id: 1,
          label: 'updated',
          order_num: 2,
          done: true
        })
      )
      .silentRun()

    expect(storeState).toEqual({
      todos: {
        todosData: {
          todosData: [
            {
              id: 1,
              label: 'updated',
              order_num: 2,
              done: true
            }
          ],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [
            {
              type: 'edit',
              id: 1,
              message: {
                id: 1,
                label: 'updated',
                order_num: 2,
                done: true
              },
              hidden: false,
              date: new Date('2022-03-05')
            }
          ],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    })
  })

  it('should test failed to update todo', async () => {
    const initialState: RootState = {
      todos: {
        todosData: {
          todosData: [
            {
              id: 2,
              label: 'test',
              order_num: 2,
              done: false
            }
          ],
          loading: 'idle',
          error: ''
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(updateTodoWatcher)
      .withReducer(rootReducer, initialState)
      .provide([
        [matchers.call.fn(sendToUpdateTodoFunc), throwError(error)],
        [
          matchers.actionChannel.pattern(
            TodosActionType.ACTION_SEND_TO_UPDATE_TODO
          ),
          TodosActionType.ACTION_SEND_TO_UPDATE_TODO
        ],
        matchers.take(TodosActionType.ACTION_SEND_TO_UPDATE_TODO)
      ])
      .put(failedToUpdateTodo(error.message))
      .dispatch(
        sendToUpdateTodo({
          id: 2,
          label: 'updated',
          order_num: 5,
          done: false
        })
      )
      .silentRun()

    expect(storeState).toEqual({
      todos: {
        todosData: {
          todosData: [
            {
              id: 2,
              label: 'test',
              order_num: 2,
              done: false
            }
          ],
          loading: 'failed',
          error: '404'
        },
        filterValue: {
          filterValue: 'all'
        }
      },
      user: {
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        userData: {
          isAuth: false,
          isRegistered: false,
          loading: 'idle',
          userData: {
            id: '',
            email: '',
            isActivated: false
          },
          loginError: '',
          registrError: '',
          updateError: '',
          logoutError: ''
        },
        websocket: {
          isWebSocketConnected: false
        }
      }
    })
  })

  it('should test update all todo', async () => {
    const initialState: ITodosReducer = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 1,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    const { storeState } = await expectSaga(sendToUpdateAllTodoWatcher)
      .withReducer(todosReducer, initialState)
      .provide([[matchers.call.fn(sendToUpdateAllTodoFunc), 'nothing']])
      .select(todosSelector)
      .dispatch(sendToUpdateAllTodo())
      .silentRun()

    expect(storeState).toEqual({
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 1,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    })
  })

  it('should test failed to update all todos', async () => {
    const initialState: ITodosReducer = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(sendToUpdateAllTodoWatcher)
      .withReducer(todosReducer, initialState)
      .select(todosSelector)
      .provide([[matchers.call.fn(sendToUpdateAllTodoFunc), throwError(error)]])
      .put(failedToUpdateAllTodo(error.message))
      .dispatch(sendToUpdateAllTodo())
      .silentRun()

    expect(storeState).toEqual({
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'failed',
      error: '404'
    })
  })

  it('should test send to delete completed todos', async () => {
    const initialState: ITodosReducer = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    const { storeState } = await expectSaga(sendToDeleteCompletedTodoWatcher)
      .withReducer(todosReducer, initialState)
      .provide([[matchers.call.fn(sendToDeleteCompletedTodoFunc), 'nothing']])
      .put(clearCompleted())
      .dispatch(
        sendToDeleteCompletedTodos([
          {
            id: 1,
            label: 'test',
            order_num: 1,
            done: false
          },
          {
            id: 2,
            label: 'updated',
            order_num: 2,
            done: true
          }
        ])
      )
      .silentRun()

    expect(storeState).toEqual({
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    })
  })

  it('should test failed to delete completed todos', async () => {
    const initialState: ITodosReducer = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 1,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(sendToDeleteCompletedTodoWatcher)
      .withReducer(todosReducer, initialState)
      .provide([
        [matchers.call.fn(sendToDeleteCompletedTodoFunc), throwError(error)]
      ])
      .put(failedToDeleteCompletedTodos(error.message))
      .dispatch(
        sendToDeleteCompletedTodos([
          {
            id: 1,
            label: 'test',
            order_num: 1,
            done: false
          },
          {
            id: 1,
            label: 'updated',
            order_num: 2,
            done: true
          }
        ])
      )
      .silentRun()

    expect(storeState).toEqual({
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 1,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ],
      loading: 'failed',
      error: '404'
    })
  })

  it('should test fetch todos', async () => {
    const initialState: ITodosReducer = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    const fakeTodos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 1,
        label: 'updated',
        order_num: 2,
        done: true
      }
    ]

    const { storeState } = await expectSaga(fetchTodosWatcher)
      .withReducer(todosReducer, initialState)
      .provide([[matchers.call.fn(fetchTodosFunc), fakeTodos]])
      .put(successfulFetchedTodos(fakeTodos))
      .dispatch(fetchTodos())
      .silentRun()

    expect(storeState).toEqual({
      todosData: fakeTodos,
      loading: 'succeded',
      error: ''
    })
  })

  it('should test failed to fetch todos', async () => {
    const initialState: ITodosReducer = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(fetchTodosWatcher)
      .withReducer(todosReducer, initialState)
      .provide([[matchers.call.fn(fetchTodosFunc), throwError(error)]])
      .put(failedToFetch(error.message))
      .dispatch(fetchTodos())
      .silentRun()

    expect(storeState).toEqual({
      todosData: [],
      loading: 'failed',
      error: '404'
    })
  })
})
