import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

import { SetupWebSocket } from '../websocket/websocket'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

const websocket = new SetupWebSocket(store.dispatch)

sagaMiddleware.run(rootSaga, websocket)
