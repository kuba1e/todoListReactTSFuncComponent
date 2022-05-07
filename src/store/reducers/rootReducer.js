import todosReducer from './todos'
import userReducer from './user'

export const rootReducer = (state, action) => {
  console.log(action.type)
  console.log(state)
  return {
    todos: todosReducer(state, action),
    user: userReducer(state, action)
  }
}
