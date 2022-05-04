import { createAsyncThunk } from '@reduxjs/toolkit'

import { callApi } from '../../services/apiService'

import { RequestParams, isObjectEmpty } from '../../helpers'

import {
  setAuthStatus,
  setUserData,
  addTodo,
  editTodo,
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo
} from './todosSlice'

export const loginUser = createAsyncThunk(
  'todos/loginUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const request = new RequestParams('POST', '/login', data)
      const userData = await callApi(request)
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
      const request = new RequestParams('POST', '/registration', data)
      const userData = await callApi(request)

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
      const request = new RequestParams('POST', '/logout')
      await callApi(request)
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
      const request = new RequestParams('GET', '/refresh')

      const response = await callApi(request)
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
      const request = new RequestParams('GET', '/todos')

      return await callApi(request)
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
      const request = new RequestParams('POST', '/todos', newTodo)

      const todo = await callApi(request)
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
      const request = new RequestParams('PUT', `/todos/${id}`, todoData)

      await callApi(request)
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
      const request = new RequestParams('PUT', '/todos', { done })

      await callApi(request)
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
      const request = new RequestParams('DELETE', `/todos/${id}`)

      await callApi(request)
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
      const request = new RequestParams('DELETE', '/todos', {
        todos: todosForDeleting
      })

      await callApi(request)
      dispatch(clearCompletedTodo())
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
