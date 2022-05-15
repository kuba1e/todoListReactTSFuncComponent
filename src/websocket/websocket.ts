import { io } from 'socket.io-client'
import { Socket } from 'socket.io'
import { Dispatch } from 'react'

import { setWebsocketConnection } from '../store/actions/user'
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  updateTodos
} from '../store/actions/todos'

import { addNotification } from '../store/actions/user'
import { callApi } from '../utils/callApi'
import { IUser } from '../types/generalTypes'

/*

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

    socket.on('updated-all-todo', (payload) => {
      dispatch(updateTodos(payload))
    })

    socket.on('deleted-completed', () => {
      console.log('completed')
      dispatch(clearCompleted())
    })
  })

  return socket
}
*/

export class SetupWebSocket {
  protected dispatch: Dispatch<any>
  static baseUrl = process.env.BASE_SOCKET_URL
  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch
  }

  events?: Socket

  connectSocket = () => {
    const token = localStorage.getItem('token')?.slice(1, -1)

    if (SetupWebSocket.baseUrl !== undefined) {
      const socket = io(SetupWebSocket.baseUrl, {
        withCredentials: true,
        extraHeaders: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
      socket.on('connect', () => {
        this.dispatch(setWebsocketConnection(true))
        this.events = socket

        if (this.events !== undefined) {
          this.events.on('added-todo', (payload) => {
            this.dispatch(addTodo(payload.data))
            this.dispatch(addNotification(payload.message))
          })
          this.events.on('edited-todo', (payload) => {
            this.dispatch(editTodo(payload.data))
            this.dispatch(addNotification(payload.message))
          })

          this.events.on('deleted-todo', (payload) => {
            this.dispatch(deleteTodo(payload.data))
            this.dispatch(addNotification(payload.message))
          })

          this.events.on('updated-all-todo', (payload) => {
            this.dispatch(updateTodos(payload))
          })

          this.events.on('deleted-completed', () => {
            console.log('completed')
            this.dispatch(clearCompleted())
          })
          this.events.on('disconnect', (reason) => {
            this.dispatch(setWebsocketConnection(false))
          })

          this.events.on('connect_error', async (error) => {
            if (error.message === 'User is unauthorized') {
              const response: IUser = await callApi('/refresh')
              localStorage.setItem(
                'token',
                JSON.stringify(response.accessToken)
              )
            }
            this.dispatch(setWebsocketConnection(false))
          })
        }
      })
    }
  }
}

export interface IWebSocket extends SetupWebSocket {}
