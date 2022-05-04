import todoReducer, {
  addTodo,
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  setFilterValue,
  editTodo,
  setUserData,
  setAuthStatus
} from './todosSlice'

import {
  loginUser,
  userRegistration,
  logoutUser,
  checkAuth,
  fetchTodos,
  sendToAddTodo,
  sentToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo
} from './asyncThunk'

export {
  addTodo,
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  setFilterValue,
  editTodo,
  setUserData,
  setAuthStatus
}

export {
  loginUser,
  userRegistration,
  logoutUser,
  checkAuth,
  fetchTodos,
  sendToAddTodo,
  sentToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo
}

export default todoReducer
