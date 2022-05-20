import { RootState } from '../../../store/reducers/rootReducer'
import {
  filterValueSelector,
  notificationSelector,
  todosSelector,
  userSelector,
  websocketSelector
} from '../selectors'

describe('test selectors', () => {
  it('should handle select from todos reducer', () => {
    const rootState: RootState = {
      todos: {
        todosData: { todosData: [], loading: 'idle', error: '' },
        filterValue: { filterValue: 'all' }
      },
      user: {
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
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        websocket: { isWebSocketConnected: false }
      }
    }

    expect(todosSelector(rootState)).toEqual(rootState.todos.todosData)
  })

  it('should handle select from filter value reducer', () => {
    const rootState: RootState = {
      todos: {
        todosData: { todosData: [], loading: 'idle', error: '' },
        filterValue: { filterValue: 'all' }
      },
      user: {
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
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        websocket: { isWebSocketConnected: false }
      }
    }

    expect(filterValueSelector(rootState)).toEqual(rootState.todos.filterValue)
  })

  it('should handle select from user reducer', () => {
    const rootState: RootState = {
      todos: {
        todosData: { todosData: [], loading: 'idle', error: '' },
        filterValue: { filterValue: 'all' }
      },
      user: {
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
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        websocket: { isWebSocketConnected: false }
      }
    }

    expect(userSelector(rootState)).toEqual(rootState.user.userData)
  })

  it('should handle select from notification reducer', () => {
    const rootState: RootState = {
      todos: {
        todosData: { todosData: [], loading: 'idle', error: '' },
        filterValue: { filterValue: 'all' }
      },
      user: {
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
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        websocket: { isWebSocketConnected: false }
      }
    }

    expect(notificationSelector(rootState)).toEqual(
      rootState.user.notifications
    )
  })

  it('should handle select from websocket reducer', () => {
    const rootState: RootState = {
      todos: {
        todosData: { todosData: [], loading: 'idle', error: '' },
        filterValue: { filterValue: 'all' }
      },
      user: {
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
        notifications: {
          notifications: [],
          notificationsForStatistic: [],
          loading: 'idle',
          error: ''
        },
        websocket: { isWebSocketConnected: false }
      }
    }

    expect(websocketSelector(rootState)).toEqual(rootState.user.websocket)
  })
})
