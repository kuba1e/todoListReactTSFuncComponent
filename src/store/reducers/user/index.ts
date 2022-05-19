import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { notificationsReducer } from './notificationsReducer'
import { websocketReducer } from './websocketReducer'

const userRootReducer = combineReducers({
  userData: userReducer,
  notifications: notificationsReducer,
  websocket: websocketReducer
})

export default userRootReducer
