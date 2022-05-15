import { spawn, all } from 'redux-saga/effects'

import todosSaga from './todoSaga'
import userSaga from './userSaga'

import { IWebSocket } from '../../websocket'

export default function* rootSaga(params: IWebSocket) {
  const sagas = [todosSaga, userSaga]
  yield all(sagas.map((saga) => spawn(saga, params)))
}
