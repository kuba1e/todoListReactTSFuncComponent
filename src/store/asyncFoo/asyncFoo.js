import { callApi } from '../../utils/callApi'

export const loginUser = async (data) => {
  try {
    const response = await callApi('POST', '/login', data)
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const userRegistration = async (data) => {
  try {
    const response = await callApi('POST', '/registration', data)
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateUserProfile = async (data) => {
  try {
    const { id } = data
    const userData = await callApi('PUT', `/profile/${id}`, data)
    localStorage.setItem('token', JSON.stringify(userData.accessToken))
    return userData.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const logoutUser = async () => {
  try {
    await callApi('POST', '/logout')
    localStorage.removeItem('token')
  } catch (error) {
    throw new Error(error.message)
  }
}

export const checkAuth = async () => {
  try {
    const response = await callApi('GET', '/refresh')
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const fetchTodos = async () => {
  try {
    return await callApi('GET', '/todos')
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToAddTodo = async (label) => {
  try {
    const newTodo = { label, done: false }
    const response = await callApi('POST', '/todos', newTodo)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToUpdateTodo = async (todo) => {
  try {
    const { id, ...todoData } = todo
    await callApi('PUT', `/todos/${id}`, todoData)
    return todo
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sentToUpdateAllTodo = async (status) => {
  try {
    await callApi('PUT', '/todos', { done: status })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToDeleteTodo = async (id) => {
  try {
    await callApi('DELETE', `/todos/${id}`)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToDeleteCompletedTodo = async (todos) => {
  try {
    const todosForDeleting = todos
      .filter((todo) => todo.done)
      .map((todo) => todo.id)

    await callApi('DELETE', '/todos', { todos: todosForDeleting })
  } catch (error) {
    throw new Error(error.message)
  }
}
