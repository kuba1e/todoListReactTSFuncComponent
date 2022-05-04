import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos'

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})
