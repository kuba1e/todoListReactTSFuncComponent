import { spawn, all } from 'redux-saga/effects'

import todosSaga from './todoSaga'

import userSaga from './userSaga'

export default function* rootSaga(params) {
  const sagas = [todosSaga, userSaga]
  yield all(sagas.map((saga) => spawn(saga, params)))
}
