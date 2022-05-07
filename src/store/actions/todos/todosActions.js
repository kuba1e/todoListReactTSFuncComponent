export const ACTION_ADD_TO_DO = 'ACTION_ADD_TO_DO'
export const addTodo = (label) => ({ type: ACTION_ADD_TO_DO, payload: label })

export const ACTION_DELETE_TO_DO = 'ACTION_DELETE_TO_DO'
export const deleteTodo = (id) => ({ type: ACTION_DELETE_TO_DO, payload: id })

export const ACTION_TOGGLE_DONE_ALL_TO_DO = 'ACTION_TOGGLE_DONE_ALL_TO_DO'
export const toggleAllDoneTodo = (status) => ({
  type: ACTION_TOGGLE_DONE_ALL_TO_DO,
  payload: status
})

export const ACTION_CLEAR_COMPLETED_TO_DO = 'ACTION_CLEAR_COMPLETED_TO_DO'
export const clearCompleted = () => ({ type: ACTION_CLEAR_COMPLETED_TO_DO })

export const ACTION_SET_FILTER_VALUE = 'ACTION_SET_FILTER_VALUE'
export const setFilterValue = (value) => ({
  type: ACTION_SET_FILTER_VALUE,
  payload: value
})

export const ACTION_EDIT_TO_DO = 'ACTION_EDIT_TO_DO'
export const editTodo = (todo) => ({ type: ACTION_EDIT_TO_DO, payload: todo })

export const ACTION_FETCH_TODOS = 'ACTION_FETCH_TODOS'
export const fetchTodos = () => ({
  type: ACTION_FETCH_TODOS
})

export const ACTION_SUCCESSFUL_FETCHED_TODOS = 'ACTION_SUCCESSFUL_FETCHED_TODOS'
export const successfulFetchedTodos = (data) => ({
  type: ACTION_SUCCESSFUL_FETCHED_TODOS,
  payload: data
})

export const ACTION_FAILED_TO_FETCH_TODOS = 'ACTION_FAILED_TO_FETCH_TODOS'
export const failedToFetch = (error) => ({
  type: ACTION_FAILED_TO_FETCH_TODOS,
  payload: error
})

export const ACTION_SEND_TO_ADD_TODO = 'ACTION_SEND_TO_ADD_TODO'
export const sendToAddTodo = (data) => ({
  type: ACTION_SEND_TO_ADD_TODO,
  payload: data
})

export const ACTION_FAILED_TO_SEND_TO_ADD_TODO =
  'ACTION_FAILED_TO_SEND_TO_ADD_TODO'
export const failedToSendToAddTodo = (error) => ({
  type: ACTION_FAILED_TO_SEND_TO_ADD_TODO,
  payload: error
})

export const ACTION_SEND_TO_UPDATE_TODO = 'ACTION_SEND_TO_UPDATE_TODO'
export const sendToUpdateTodo = (data) => ({
  type: ACTION_SEND_TO_UPDATE_TODO,
  payload: data
})

export const ACTION_FAILED_TO_UPDATE_TODO = 'ACTION_FAILED_TO_UPDATE_TODO'
export const failedToUpdateTodo = (error) => ({
  type: ACTION_FAILED_TO_UPDATE_TODO,
  payload: error
})

export const ACTION_SEND_TO_UPDATED_ALL_TODO = 'ACTION_SEND_TO_UPDATED_ALL_TODO'
export const sendToUpdateAllTodo = (status) => ({
  type: ACTION_SEND_TO_UPDATED_ALL_TODO,
  payload: status
})

export const ACTION_FAILED_TO_UPDATE_ALL_TODO =
  'ACTION_FAILED_TO_UPDATE_ALL_TODO'
export const failedToUpdateAllTodo = (error) => ({
  type: ACTION_FAILED_TO_UPDATE_ALL_TODO,
  payload: error
})

export const ACTION_SEND_TO_DELETE_TODO = 'ACTION_SEND_TO_DELETE_TODO'
export const sendToDeleteTodo = (id) => ({
  type: ACTION_SEND_TO_DELETE_TODO,
  payload: id
})

export const ACTION_FAILED_TO_DELETE_TODO = 'ACTION_FAILED_TO_DELETE_TODO'
export const failedToDeleteTodo = (error) => ({
  type: ACTION_FAILED_TO_DELETE_TODO,
  payload: error
})

export const ACTION_SEND_TO_DELETE_COMPLETED_TODOS =
  'ACTION_SEND_TO_DELETE_COMPLETED_TODOS'
export const sendToDeleteCompletedTodos = (todos) => ({
  type: ACTION_SEND_TO_DELETE_COMPLETED_TODOS,
  payload: todos
})

export const ACTION_FAILED_TO_DELETE_COMPLETED_TODOS =
  'ACTION_FAILED_TO_DELETE_COMPLETED_TODOS'
export const failedToDeleteCompletedTodos = (error) => ({
  type: ACTION_FAILED_TO_DELETE_COMPLETED_TODOS,
  payload: error
})
