import { ITodo, UnknownAction } from './generalTypes'

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

interface IAddTodoAction {
  type: TodosActionType.ACTION_ADD_TO_DO
  payload: ITodo
}

interface IDeleteTodoAction {
  type: TodosActionType.ACTION_DELETE_TO_DO
  payload: number
}

interface IToggleDoneAllTodoAction {
  type: TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO
  payload: boolean
}

interface IClearCompletedTodoAction {
  type: TodosActionType.ACTION_CLEAR_COMPLETED_TO_DO
}

interface IEditTodoAction {
  type: TodosActionType.ACTION_EDIT_TO_DO
  payload: ITodo
}

interface IFetchTodosAction {
  type: TodosActionType.ACTION_FETCH_TODOS
}

interface ISuccessfulFetchedTodos {
  type: TodosActionType.ACTION_SUCCESSFUL_FETCHED_TODOS
  payload: ITodo[]
}

interface IFailedToFetchTodosAction {
  type: TodosActionType.ACTION_FAILED_TO_FETCH_TODOS
  payload: string
}

export interface ISendToUpdateTodo {
  type: TodosActionType.ACTION_SEND_TO_UPDATE_TODO
  payload: ITodo
}

interface IFailedToUpdateTodosAction {
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

interface IFailedToSendToAddTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_SEND_TO_ADD_TODO
  payload: string
}

export interface ISendToUpdateAllTodo {
  type: TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO
  payload: ITodo[]
}

interface IFailedToUpdateAllTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_UPDATE_ALL_TODO
  payload: string
}

export interface ISendToDelete {
  type: TodosActionType.ACTION_SEND_TO_DELETE_TODO
  payload: number
}

interface IFailedToDeleteTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_DELETE_TODO
  payload: string
}

export interface ISendToDeleteCompletedTodos {
  type: TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS
  payload: ITodo[]
}

interface IFailedToDeleteCompletedTodoAction {
  type: TodosActionType.ACTION_FAILED_TO_DELETE_COMPLETED_TODOS
  payload: string
}

interface IUpdateAllTodos {
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
  | UnknownAction
