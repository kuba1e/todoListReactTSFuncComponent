import { createAsyncThunk } from '@reduxjs/toolkit'

import { callApi } from '../../services/callApi'

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
      const userData = await callApi('POST', '/login', data)
      localStorage.setItem('token', JSON.stringify(userData.accessToken))
      dispatch(setUserData(userData.user))
      dispatch(setAuthStatus(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'todos/updateUserProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { id } = data
      const userData = await callApi('PUT', `/profile/${id}`, data)

      dispatch(setAuthStatus(true))
      dispatch(setUserData(userData.user))
      localStorage.setItem('token', JSON.stringify(userData.accessToken))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const userRegistration = createAsyncThunk(
  'todos/userRegistration',
  async (data, { rejectWithValue }) => {
    try {
      const userData = await callApi('POST', '/registration', data)
      // localStorage.setItem('token', JSON.stringify(userData.accessToken))
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'todos/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await callApi('POST', '/logout')
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
      const response = await callApi('GET', '/refresh')
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
      return await callApi('GET', '/todos')
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
      const todo = await callApi('POST', '/todos', newTodo)
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
      await callApi('PUT', `/todos/${id}`, todoData)
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
      await callApi('PUT', '/todos', { done })
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
      await callApi('DELETE', `/todos/${id}`)
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

      await callApi('DELETE', '/todos', {
        todos: todosForDeleting
      })
      dispatch(clearCompletedTodo())
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
