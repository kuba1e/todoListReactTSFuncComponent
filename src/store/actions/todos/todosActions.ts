import { action } from 'typesafe-actions'
import { ITodo } from '../../../types/generalTypes'

import { TodosActionType } from '../../../types/todos'

export const addTodo = (todo: ITodo) =>
  action(TodosActionType.ACTION_ADD_TO_DO, todo)

export const deleteTodo = (id: number) =>
  action(TodosActionType.ACTION_DELETE_TO_DO, id)

export const toggleAllDoneTodo = (status: boolean) =>
  action(TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO, status)

export const clearCompleted = () =>
  action(TodosActionType.ACTION_CLEAR_COMPLETED_TO_DO)

export const setFilterValue = (value: string) =>
  action(TodosActionType.ACTION_SET_FILTER_VALUE, value)

export const editTodo = (todo: ITodo) =>
  action(TodosActionType.ACTION_EDIT_TO_DO, todo)

export const fetchTodos = () => action(TodosActionType.ACTION_FETCH_TODOS)

export const successfulFetchedTodos = (data: ITodo[]) =>
  action(TodosActionType.ACTION_SUCCESSFUL_FETCHED_TODOS, data)

export const failedToFetch = (error: string) =>
  action(TodosActionType.ACTION_FAILED_TO_FETCH_TODOS, error)

export const sendToAddTodo = (data: string) =>
  action(TodosActionType.ACTION_SEND_TO_ADD_TODO, data)

export const failedToSendToAddTodo = (error: string) =>
  action(TodosActionType.ACTION_FAILED_TO_SEND_TO_ADD_TODO, error)

export const sendToUpdateTodo = (data: ITodo) =>
  action(TodosActionType.ACTION_SEND_TO_DELETE_TODO, data)

export const failedToUpdateTodo = (error: string) =>
  action(TodosActionType.ACTION_FAILED_TO_UPDATE_TODO, error)

export const sendToUpdateAllTodo = (status: boolean) =>
  action(TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO, status)

export const failedToUpdateAllTodo = (error: string) =>
  action(TodosActionType.ACTION_FAILED_TO_UPDATE_ALL_TODO, error)

export const sendToDeleteTodo = (id: number) =>
  action(TodosActionType.ACTION_SEND_TO_DELETE_TODO, id)

export const failedToDeleteTodo = (error: string) =>
  action(TodosActionType.ACTION_FAILED_TO_DELETE_TODO, error)

export const sendToDeleteCompletedTodos = (todos: ITodo[]) =>
  action(TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS, todos)

export const failedToDeleteCompletedTodos = (error: string) =>
  action(TodosActionType.ACTION_FAILED_TO_DELETE_COMPLETED_TODOS, error)
