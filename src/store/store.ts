import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

import { SetupWebSocket } from '../websocket/websocket'
import { RootState } from './reducers/rootReducer'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

export const websocket = new SetupWebSocket(store.dispatch)

sagaMiddleware.run(rootSaga)

export const getStoreWithState = (preloadState?: RootState) => {
  return createStore(rootReducer, preloadState)
}
