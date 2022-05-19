import {
  ITodosReducer,
  TodosAction,
  TodosActionType
} from '../../../types/todos'

import {
  deleteTodo,
  editTodo,
  toggleAllDoneTodo,
  clearCompletedTodo
} from '../../../helpers'

const initialTodosState: ITodosReducer = {
  todosData: [],
  loading: 'idle',
  error: ''
}

export const todosReducer = (
  state = initialTodosState,
  action: TodosAction
): ITodosReducer => {
  switch (action.type) {
    case TodosActionType.ACTION_ADD_TO_DO:
      return {
        ...state,
        todosData: [...state.todosData, action.payload]
      }
    case TodosActionType.ACTION_DELETE_TO_DO:
      return {
        ...state,
        todosData: deleteTodo(action.payload, state.todosData)
      }

    case TodosActionType.ACTION_EDIT_TO_DO:
      return {
        ...state,
        todosData: editTodo(action.payload, state.todosData)
      }
    case TodosActionType.ACTION_UPDATE_ALL_TO_DO:
      console.log(action.payload)
      return {
        ...state,
        todosData: action.payload
      }

    case TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO:
      return {
        ...state,
        todosData: toggleAllDoneTodo(action.payload, state.todosData)
      }
    case TodosActionType.ACTION_CLEAR_COMPLETED_TO_DO:
      return {
        ...state,
        todosData: clearCompletedTodo(state.todosData)
      }

    case TodosActionType.ACTION_FETCH_TODOS:
      return {
        ...state,
        error: '',
        loading: 'pending'
      }
    case TodosActionType.ACTION_SUCCESSFUL_FETCHED_TODOS:
      return {
        ...state,
        loading: 'succeded',
        todosData: action.payload
      }
    case TodosActionType.ACTION_FAILED_TO_FETCH_TODOS:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      }

    case TodosActionType.ACTION_FAILED_TO_UPDATE_TODO:
      return {
        ...state,
        error: action.payload
      }
    case TodosActionType.ACTION_FAILED_TO_SEND_TO_ADD_TODO:
      return {
        ...state,
        error: action.payload
      }
    case TodosActionType.ACTION_FAILED_TO_UPDATE_ALL_TODO:
      return {
        ...state,
        error: action.payload
      }
    case TodosActionType.ACTION_FAILED_TO_DELETE_TODO:
      return {
        ...state,
        error: action.payload
      }
    case TodosActionType.ACTION_FAILED_TO_DELETE_COMPLETED_TODOS:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
