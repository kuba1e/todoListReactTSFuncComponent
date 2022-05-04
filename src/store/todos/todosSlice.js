import { createSlice } from '@reduxjs/toolkit'

import {
  fetchTodos,
  sendToAddTodo,
  sentToUpdateTodo,
  sentToUpdateAllTodo,
  sendToDeleteTodo,
  sendToDeleteCompletedTodo
} from './asyncThunk'

const initialState = {
  todosData: [],
  filterValue: 'all',
  loading: 'idle',
  error: null,
  user: {},
  isAuth: false
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todosData.push(payload)
    },
    deleteTodo: (state, { payload }) => {
      state.todosData = state.todosData.filter((todo) => todo.id !== payload)
    },
    toggleAllDoneTodo: (state, { payload }) => {
      state.todosData = state.todosData.map((todo) => ({
        ...todo,
        done: payload
      }))
    },
    clearCompletedTodo: (state) => {
      state.todosData = state.todosData.filter((todo) => !todo.done)
    },
    setFilterValue: (state, { payload }) => {
      state.filterValue = payload
    },
    editTodo: (state, { payload }) => {
      state.todosData = state.todosData.map((todo) => {
        if (todo.id === payload.id) {
          return payload
        }
        return todo
      })
    },
    setUserData: (state, { payload }) => {
      state.user = payload
    },
    setAuthStatus: (state, { payload }) => {
      state.isAuth = payload
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchTodos.fulfilled]: (state, { payload }) => {
      state.loading = 'succeded'
      state.error = ''
      state.todosData = payload
    },
    [fetchTodos.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sendToAddTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sendToAddTodo.fulfilled]: (state, { payload }) => {
      state.loading = 'succeded'
      state.error = ''

      state.error = payload
    },
    [sentToUpdateTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sentToUpdateTodo.fulfilled]: (state, { payload }) => {
      state.loading = 'succeded'
      state.error = ''

      state.error = payload
    },
    [sentToUpdateAllTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sentToUpdateAllTodo.fulfilled]: (state, { payload }) => {
      state.loading = 'succeded'
      state.error = ''

      state.error = payload
    },
    [sendToDeleteTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sendToDeleteTodo.fulfilled]: (state, { payload }) => {
      state.loading = 'succeded'
      state.error = ''

      state.error = payload
    },
    [sendToDeleteCompletedTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sendToDeleteCompletedTodo.fulfilled]: (state, { payload }) => {
      state.loading = 'succeded'
      state.error = ''

      state.error = payload
    }
  }
})

export const {
  addTodo,
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  setFilterValue,
  editTodo,
  setUserData,
  setAuthStatus
} = todosSlice.actions

export default todosSlice.reducer
