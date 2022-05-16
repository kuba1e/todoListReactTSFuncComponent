import { io } from 'socket.io-client'
import { Socket } from 'socket.io'
import { Dispatch } from 'react'

import {
  deleteNotification,
  setWebsocketConnection
} from '../store/actions/user'
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  updateTodos
} from '../store/actions/todos'

import { addNotification } from '../store/actions/user'

export interface IWebSocket {
  events?: Socket
  connectSocket: () => void
}

export class SetupWebSocket implements IWebSocket {
  public dispatch: Dispatch<any>
  readonly baseUrl = process.env.BASE_SOCKET_URL
  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch
  }

  events?: Socket

  connectSocket = () => {
    const token = localStorage.getItem('token')?.slice(1, -1)

    if (this.baseUrl !== undefined) {
      const socket = io(this.baseUrl, {
        withCredentials: true,
        extraHeaders: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
      socket.on('connect', () => {
        console.log(socket.id)
        localStorage.setItem('socketId', socket.id)
        this.dispatch(setWebsocketConnection(true))
        this.events = socket
      })

      socket.on('added-todo', (payload) => {
        console.log(payload)
        this.dispatch(addTodo(payload.data))
        this.dispatch(addNotification(payload.notification))
      })
      socket.on('edited-todo', (payload) => {
        this.dispatch(editTodo(payload.data))
        this.dispatch(addNotification(payload.notification))
      })

      socket.on('deleted-todo', (payload) => {
        this.dispatch(deleteTodo(payload.data.id))
        this.dispatch(addNotification(payload.notification))
      })

      socket.on('updated-all-todo', (payload) => {
        this.dispatch(updateTodos(payload))
      })

      socket.on('deleted-completed', () => {
        this.dispatch(clearCompleted())
      })

      socket.on('deleted-notification', (id) => {
        console.log(id)
        this.dispatch(deleteNotification(id))
      })

      socket.on('disconnect', () => {
        this.dispatch(setWebsocketConnection(false))
      })

      socket.on('connect_error', async () => {
        this.dispatch(setWebsocketConnection(false))
      })
    }
  }
}
