import { combineReducers } from 'redux'

import { todosReducer } from './todosReducer'
import { filterValueReducer } from './filterValueReducer'

const todosRootReducer = combineReducers({
  todosData: todosReducer,
  filterValue: filterValueReducer
})

export default todosRootReducer
