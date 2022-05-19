import {
  WebsocketActionType,
  IWebsocketReducer,
  ISetWebsocketConnection
} from '../../../types/websocket'

const initialState: IWebsocketReducer = {
  isWebSocketConnected: false
}

export const websocketReducer = (
  state = initialState,
  action: ISetWebsocketConnection
) => {
  switch (action.type) {
    case WebsocketActionType.ACTION_SET_WEBSOCKET_CONNECTION:
      return {
        ...state,
        isWebSocketConnected: action.payload
      }
    default:
      return state
  }
}
