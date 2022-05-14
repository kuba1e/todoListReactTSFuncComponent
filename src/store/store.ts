import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

import { setupWebSocket } from '../websocket/websocket'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

const websocket = setupWebSocket(store.dispatch)

sagaMiddleware.run(rootSaga, websocket)
