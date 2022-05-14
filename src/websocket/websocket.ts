import { io } from 'socket.io-client'

import { Dispatch } from 'react'
import { setWebsocketConnection } from '../store/actions/user'
import { addTodo, deleteTodo, editTodo } from '../store/actions/todos'

const baseUrl = process.env.BASE_SOCKET_URL

export const setupWebSocket = (dispatch: Dispatch<any>) => {
  if (baseUrl === undefined) {
    return
  }
  const token = localStorage.getItem('token')?.slice(1, -1) ?? ''

  const socket = io(baseUrl, {
    withCredentials: true,
    extraHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })
  socket.on('connect', () => {
    dispatch(setWebsocketConnection(true))
    socket.on('added-todo', (payload) => {
      dispatch(addTodo(payload))
    })
    socket.on('edited-todo', (payload) => {
      dispatch(editTodo(payload))
    })

    socket.on('deleted-todo', (payload) => {
      dispatch(deleteTodo(payload))
    })
  })

  return socket
}
