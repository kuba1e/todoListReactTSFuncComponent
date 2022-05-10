import { ITodo } from './generalTypes'

export enum TodosActionType {
  ACTION_ADD_TO_DO = 'ACTION_ADD_TO_DO',
  ACTION_DELETE_TO_DO = 'ACTION_DELETE_TO_DO',
  ACTION_TOGGLE_DONE_ALL_TO_DO = 'ACTION_TOGGLE_DONE_ALL_TO_DO',
  ACTION_CLEAR_COMPLETED_TO_DO = 'ACTION_CLEAR_COMPLETED_TO_DO',
  ACTION_SET_FILTER_VALUE = 'ACTION_SET_FILTER_VALUE',
  ACTION_EDIT_TO_DO = 'ACTION_EDIT_TO_DO',
  ACTION_FETCH_TODOS = 'ACTION_FETCH_TODOS',
  ACTION_SUCCESSFUL_FETCHED_TODOS = 'ACTION_SUCCESSFUL_FETCHED_TODOS',
  ACTION_FAILED_TO_FETCH_TODOS = 'ACTION_FAILED_TO_FETCH_TODOS',
  ACTION_SEND_TO_ADD_TODO = 'ACTION_SEND_TO_ADD_TODO',
  ACTION_FAILED_TO_SEND_TO_ADD_TODO = 'ACTION_FAILED_TO_SEND_TO_ADD_TODO',
  ACTION_SEND_TO_UPDATE_TODO = 'ACTION_SEND_TO_UPDATE_TODO',
  ACTION_FAILED_TO_UPDATE_TODO = 'ACTION_FAILED_TO_UPDATE_TODO',
  ACTION_SEND_TO_UPDATED_ALL_TODO = 'ACTION_SEND_TO_UPDATED_ALL_TODO',
  ACTION_FAILED_TO_UPDATE_ALL_TODO = 'ACTION_FAILED_TO_UPDATE_ALL_TODO',
  ACTION_SEND_TO_DELETE_TODO = 'ACTION_SEND_TO_DELETE_TODO',
  ACTION_FAILED_TO_DELETE_TODO = 'ACTION_FAILED_TO_DELETE_TODO',
  ACTION_SEND_TO_DELETE_COMPLETED_TODOS = 'ACTION_SEND_TO_DELETE_COMPLETED_TODOS',
  ACTION_FAILED_TO_DELETE_COMPLETED_TODOS = 'ACTION_FAILED_TO_DELETE_COMPLETED_TODOS'
}

interface AddTodoAction {
  type: TodosActionType.ACTION_ADD_TO_DO
  payload: ITodo
}

interface DeleteTodoAction {
  type: TodosActionType.ACTION_DELETE_TO_DO
  payload: number
}

interface ToggleDoneAllTodoAction {
  type: TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO
  payload: boolean
}

interface ClearCompletedTodoAction {
  type: TodosActionType.ACTION_CLEAR_COMPLETED_TO_DO
}

interface SetFilterValueAction {
  type: TodosActionType.ACTION_SET_FILTER_VALUE
  payload: string
}

interface EditTodoAction {
  type: TodosActionType.ACTION_EDIT_TO_DO
  payload: ITodo
}

interface FetchTodosAction {
  type: TodosActionType.ACTION_FETCH_TODOS
}

interface SuccessfulFetchedTodos {
  type: TodosActionType.ACTION_SUCCESSFUL_FETCHED_TODOS
  payload: ITodo[]
}

interface FailedToFetchTodosAction {
  type: TodosActionType.ACTION_FAILED_TO_FETCH_TODOS
  payload: string
}

export interface SendToUpdateTodo {
  type: TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  payload: ITodo
}

interface FailedToUpdateTodosAction {
  type: TodosActionType.ACTION_FAILED_TO_UPDATE_TODO
  payload: string
}

export interface SendToAddTodo {
  type: TodosActionType.ACTION_SEND_TO_ADD_TODO
  payload: string
}

interface FailedToSendToAddTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_SEND_TO_ADD_TODO
  payload: string
}

export interface sendToUpdateAllTodo {
  type: TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO
  payload: boolean
}

interface FailedToUpdateAllTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_UPDATE_ALL_TODO
  payload: string
}

export interface SendToDelete {
  type: TodosActionType.ACTION_SEND_TO_DELETE_TODO
  payload: number
}

interface FailedToDeleteTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_DELETE_TODO
  payload: string
}

export interface SendToDeleteCompletedTodos {
  type: TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS
  payload: ITodo[]
}

interface FailedToDeleteCompletedTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_DELETE_COMPLETED_TODOS
  payload: string
}

export interface ITodosReducer {
  todosData: [] | ITodo[]
  filterValue: string
  loading: string
  error: string
}
export type TodosAction =
  | AddTodoAction
  | DeleteTodoAction
  | ToggleDoneAllTodoAction
  | ClearCompletedTodoAction
  | SetFilterValueAction
  | EditTodoAction
  | FetchTodosAction
  | SuccessfulFetchedTodos
  | FailedToFetchTodosAction
  | FailedToUpdateTodosAction
  | FailedToSendToAddTodoAction
  | FailedToUpdateAllTodoAction
  | FailedToDeleteTodoAction
  | FailedToDeleteCompletedTodoAction
