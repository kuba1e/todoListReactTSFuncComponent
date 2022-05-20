import { IUnknownAction } from './generalTypes'

export enum WebsocketActionType {
  ACTION_SET_WEBSOCKET_CONNECTION = 'ACTION_SET_WEBSOCKET_CONNECTION'
}

export interface IWebsocketReducer {
  isWebSocketConnected: boolean
}

export interface ISetWebsocketConnection {
  type: WebsocketActionType.ACTION_SET_WEBSOCKET_CONNECTION
  payload: boolean
}

export type WebsocketTypeAction = ISetWebsocketConnection | IUnknownAction
