import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import apiService from '../../services/apiService'

import { isObjectEmpty } from '../../helpers'

export const loginUser = createAsyncThunk(
  'todos/loginUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const userData = await apiService('POST', '/login', data)
      const isUserDataEmpty = isObjectEmpty(userData)
      if (isUserDataEmpty) {
        throw new Error(userData.message)
      }
      localStorage.setItem('token', JSON.stringify(userData.accessToken))
      dispatch(setAuthStatus(true))
      dispatch(setUserData(userData.data.user))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const userRegistration = createAsyncThunk(
  'todos/userRegistration',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const userData = await apiService('POST', '/registration', data)

      const isUserDataEmpty = isObjectEmpty(userData.data)
      if (isUserDataEmpty) {
        throw new Error(userData.message)
      }
      dispatch(setAuthStatus(true))
      dispatch(setUserData(userData.data.user))
      localStorage.setItem('token', JSON.stringify(userData.data.accessToken))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'todos/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await apiService('POST', '/logout')
      dispatch(setAuthStatus(false))
      dispatch(setUserData({}))

      localStorage.removeItem('token')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'todos/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService('GET', '/refresh')
      localStorage.setItem('token', JSON.stringify(response.accessToken))
      dispatch(setAuthStatus(true))
      dispatch(setUserData(response.user))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      return await apiService('GET', '/todos')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sendToAddTodo = createAsyncThunk(
  'todos/sendToAddTodo',
  async (label, { rejectWithValue, dispatch }) => {
    try {
      const newTodo = { label, done: false }
      const todo = await apiService('POST', '/todos', newTodo)
      dispatch(addTodo(todo))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sentToUpdateTodo = createAsyncThunk(
  'todos/sentToUpdateTodo',
  async (todo, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...todoData } = todo
      await apiService('PUT', `/todos/${id}`, todoData)
      dispatch(editTodo(todo))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sentToUpdateAllTodo = createAsyncThunk(
  'todos/sentToUpdateAllTodo',
  async (done, { rejectWithValue, dispatch }) => {
    try {
      await apiService('PUT', '/todos', { done })
      dispatch(toggleAllDoneTodo(done))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sendToDeleteTodo = createAsyncThunk(
  'todos/sendToDeleteTodo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await apiService('DELETE', `/todos/${id}`)
      dispatch(deleteTodo(id))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sendToDeleteCompletedTodo = createAsyncThunk(
  'todos/sendToDeleteCompletedTodo',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const {
        todos: { todosData }
      } = getState()
      const todosForDeleting = todosData
        .filter((todo) => todo.done)
        .map((todo) => todo.id)

      await apiService('DELETE', '/todos', { todos: todosForDeleting })
      dispatch(clearCompletedTodo())
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

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
    [sentToUpdateTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sentToUpdateAllTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sendToDeleteTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
      state.error = payload
    },
    [sendToDeleteCompletedTodo.rejected]: (state, { payload }) => {
      state.loading = 'failed'
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
