import { ITodo, IUnknownAction } from './generalTypes'

export enum TodosActionType {
  ACTION_ADD_TO_DO = 'ACTION_ADD_TO_DO',
  ACTION_DELETE_TO_DO = 'ACTION_DELETE_TO_DO',
  ACTION_TOGGLE_DONE_ALL_TO_DO = 'ACTION_TOGGLE_DONE_ALL_TO_DO',
  ACTION_CLEAR_COMPLETED_TO_DO = 'ACTION_CLEAR_COMPLETED_TO_DO',
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
  ACTION_FAILED_TO_DELETE_COMPLETED_TODOS = 'ACTION_FAILED_TO_DELETE_COMPLETED_TODOS',
  ACTION_UPDATE_ALL_TO_DO = 'ACTION_UPDATE_ALL_TO_DO',
  ACTION_ADD_NOTIFICATION = 'ACTION_ADD_NOTIFICATION',
  ACTION_DELETE_NOTIFICATION = 'ACTION_DELETE_NOTIFICATION'
}

export interface IAddTodoAction {
  type: TodosActionType.ACTION_ADD_TO_DO
  payload: ITodo
}

export interface IDeleteTodoAction {
  type: TodosActionType.ACTION_DELETE_TO_DO
  payload: number
}

export interface IToggleDoneAllTodoAction {
  type: TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO
  payload: boolean
}

export interface IClearCompletedTodoAction {
  type: TodosActionType.ACTION_CLEAR_COMPLETED_TO_DO
}

export interface IEditTodoAction {
  type: TodosActionType.ACTION_EDIT_TO_DO
  payload: ITodo
}

export interface IFetchTodosAction {
  type: TodosActionType.ACTION_FETCH_TODOS
}

export interface ISuccessfulFetchedTodos {
  type: TodosActionType.ACTION_SUCCESSFUL_FETCHED_TODOS
  payload: ITodo[]
}

export interface IFailedToFetchTodosAction {
  type: TodosActionType.ACTION_FAILED_TO_FETCH_TODOS
  payload: string
}

export interface ISendToUpdateTodo {
  type: TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  payload: ITodo
}

export interface IFailedToUpdateTodosAction {
  type: TodosActionType.ACTION_FAILED_TO_UPDATE_TODO
  payload: string
}

export interface ISendToAddTodo {
  type: TodosActionType.ACTION_SEND_TO_ADD_TODO
  payload: {
    label: string
    todosData: ITodo[] | []
  }
}

export interface IFailedToSendToAddTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_SEND_TO_ADD_TODO
  payload: string
}

export interface ISendToUpdateAllTodo {
  type: TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO
  payload: ITodo[]
}

export interface IFailedToUpdateAllTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_UPDATE_ALL_TODO
  payload: string
}

export interface ISendToDelete {
  type: TodosActionType.ACTION_SEND_TO_DELETE_TODO
  payload: number
}

export interface IFailedToDeleteTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_DELETE_TODO
  payload: string
}

export interface ISendToDeleteCompletedTodos {
  type: TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS
  payload: ITodo[]
}

export interface IFailedToDeleteCompletedTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_DELETE_COMPLETED_TODOS
  payload: string
}

export interface IUpdateAllTodos {
  type: TodosActionType.ACTION_UPDATE_ALL_TO_DO
  payload: ITodo[]
}

export interface ITodosReducer {
  todosData: [] | ITodo[]
  loading: string
  error: string
}

export type TodosAction =
  | IAddTodoAction
  | IDeleteTodoAction
  | IToggleDoneAllTodoAction
  | IClearCompletedTodoAction
  | IEditTodoAction
  | IFetchTodosAction
  | ISuccessfulFetchedTodos
  | IFailedToFetchTodosAction
  | IFailedToUpdateTodosAction
  | IFailedToSendToAddTodoAction
  | IFailedToUpdateAllTodoAction
  | IFailedToDeleteTodoAction
  | IFailedToDeleteCompletedTodoAction
  | IUpdateAllTodos
  | IUnknownAction
