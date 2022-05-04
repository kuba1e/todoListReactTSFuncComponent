import todoListReducer, {
  fetchTodos,
  sendToAddTodo,
  sentToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo,
  loginUser,
  userRegistration,
  logoutUser,
  checkAuth,
  setFilterValue
} from './todosSlice'

export default todoListReducer

export {
  fetchTodos,
  sendToAddTodo,
  sentToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo,
  loginUser,
  userRegistration,
  logoutUser,
  checkAuth,
  setFilterValue
}
