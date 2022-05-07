import { callApi } from '../../utils/callApi'

export const loginUser = async (data) => {
  try {
    const response = await callApi('/login', { method: 'POST', data })
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const userRegistration = async (data) => {
  try {
    const response = await callApi('/registration', { method: 'POST', data })
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateUserProfile = async (data) => {
  try {
    const { id } = data
    const userData = await callApi(`/profile/${id}`, {
      method: 'PUT',
      data
    })
    localStorage.setItem('token', JSON.stringify(userData.accessToken))
    return userData.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const logoutUser = async () => {
  try {
    await callApi('/logout', { method: 'POST' })
    localStorage.removeItem('token')
  } catch (error) {
    throw new Error(error.message)
  }
}

export const checkAuth = async () => {
  try {
    const response = await callApi('/refresh')
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const fetchTodos = async (signal) => {
  try {
    return await callApi('/todos', { signal })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToAddTodo = async (label) => {
  try {
    const newTodo = { label, done: false }
    const response = await callApi('/todos', {
      method: 'POST',
      data: newTodo
    })
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToUpdateTodo = async (todo) => {
  try {
    const { id, ...todoData } = todo
    await callApi(`/todos/${id}`, { method: 'PUT', data: todoData })
    return todo
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sentToUpdateAllTodo = async (status) => {
  try {
    await callApi('/todos', { method: 'PUT', data: { done: status } })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToDeleteTodo = async (id) => {
  try {
    await callApi(`/todos/${id}`, { method: 'DELETE' })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendToDeleteCompletedTodo = async (todos) => {
  try {
    const todosForDeleting = todos
      .filter((todo) => todo.done)
      .map((todo) => todo.id)

    await callApi('/todos', {
      method: 'DELETE',
      data: { todos: todosForDeleting }
    })
  } catch (error) {
    throw new Error(error.message)
  }
}
