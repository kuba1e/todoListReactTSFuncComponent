import { callApi } from '../../utils/callApi'

import {
  IUser,
  ITodo,
  ICredentials,
  IUserToUpdate
} from '../../types/generalTypes'

import { generateValue } from '../../helpers'

export const loginUser = async (data: ICredentials) => {
  try {
    const response: IUser = await callApi('/login', {
      method: 'POST',
      data
    })
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw error
  }
}

export const userRegistration = async (data: ICredentials) => {
  try {
    const response: IUser = await callApi('/registration', {
      method: 'POST',
      data
    })
    console.log(response)

    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (data: IUserToUpdate) => {
  try {
    const { id } = data
    const response: IUser = await callApi(`/profile/${id}`, {
      method: 'PUT',
      data
    })
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response.user
  } catch (error) {
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await callApi('/logout', { method: 'POST' })
    localStorage.removeItem('token')
  } catch (error) {
    throw error
  }
}

export const checkAuth = async () => {
  try {
    const response: IUser = await callApi('/refresh')
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw error
  }
}

export const fetchTodos = async (signal: AbortSignal) => {
  try {
    const response: ITodo[] = await callApi('/todos', { signal })
    return response
  } catch (error) {
    throw error
  }
}

export const sendToAddTodo = async ([label, todosData]: Array<any>) => {
  try {
    const order_num = generateValue(todosData, 'order_num')
    const newTodo = { label, done: false, order_num }
    const response: ITodo = await callApi('/todos', {
      method: 'POST',
      data: newTodo
    })
    return response
  } catch (error) {
    throw error
  }
}

export const sendToUpdateTodo = async (todo: ITodo) => {
  try {
    const { id, ...todoData } = todo
    await callApi(`/todos/${id}`, { method: 'PUT', data: todoData })
    return todo
  } catch (error) {
    throw error
  }
}

export const sentToUpdateAllTodo = async (status: boolean) => {
  try {
    await callApi('/todos', { method: 'PUT', data: { done: status } })
  } catch (error) {
    throw error
  }
}

export const sendToDeleteTodo = async (id: number) => {
  try {
    await callApi(`/todos/${id}`, { method: 'DELETE' })
  } catch (error) {
    throw error
  }
}

export const sendToDeleteCompletedTodo = async (todos: ITodo[]) => {
  try {
    const todosForDeleting = todos
      .filter((todo) => todo.done)
      .map((todo) => todo.id)

    await callApi('/todos', {
      method: 'DELETE',
      data: { todos: todosForDeleting }
    })
  } catch (error) {
    throw error
  }
}
