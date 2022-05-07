import {
  ACTION_ADD_TO_DO,
  ACTION_DELETE_TO_DO,
  ACTION_TOGGLE_DONE_ALL_TO_DO,
  ACTION_CLEAR_COMPLETED_TO_DO,
  ACTION_SET_FILTER_VALUE,
  ACTION_EDIT_TO_DO,
  ACTION_FETCH_TODOS,
  ACTION_SUCCESSFUL_FETCHED_TODOS,
  ACTION_FAILED_TO_FETCH_TODOS,
  ACTION_FAILED_TO_UPDATE_TODO,
  ACTION_FAILED_TO_SEND_TO_ADD_TODO,
  ACTION_FAILED_TO_UPDATE_ALL_TODO,
  ACTION_FAILED_TO_DELETE_TODO,
  ACTION_FAILED_TO_DELETE_COMPLETED_TODOS
} from '../../actions/todos'

import {
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  editTodo
} from '../../../helpers'

const initialState = {
  todosData: [],
  filterValue: 'all',
  loading: 'idle',
  error: ''
}

export const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_ADD_TO_DO:
      return {
        ...state,
        todosData: [...state.todosData, payload]
      }
    case ACTION_DELETE_TO_DO:
      return {
        ...state,
        todosData: deleteTodo(payload, state.todosData)
      }

    case ACTION_EDIT_TO_DO:
      return {
        ...state,
        todosData: editTodo(payload, state.todosData)
      }

    case ACTION_TOGGLE_DONE_ALL_TO_DO:
      return {
        ...state,
        todosData: toggleAllDoneTodo(payload, state.todosData)
      }
    case ACTION_CLEAR_COMPLETED_TO_DO:
      return {
        ...state,
        todosData: clearCompletedTodo(state.todosData)
      }
    case ACTION_SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: payload
      }

    case ACTION_FETCH_TODOS:
      return {
        ...state,
        error: '',
        loading: 'pending'
      }
    case ACTION_SUCCESSFUL_FETCHED_TODOS:
      return {
        ...state,
        loading: 'succeded',
        todosData: payload
      }
    case ACTION_FAILED_TO_FETCH_TODOS:
      return {
        ...state,
        loading: 'failed',
        error: payload
      }

    case ACTION_FAILED_TO_UPDATE_TODO:
      return {
        ...state,
        error: payload
      }
    case ACTION_FAILED_TO_SEND_TO_ADD_TODO:
      return {
        ...state,
        error: payload
      }
    case ACTION_FAILED_TO_UPDATE_ALL_TODO:
      return {
        ...state,
        error: payload
      }
    case ACTION_FAILED_TO_DELETE_TODO:
      return {
        ...state,
        error: payload
      }
    case ACTION_FAILED_TO_DELETE_COMPLETED_TODOS:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}
