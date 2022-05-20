import {
  WebsocketActionType,
  IWebsocketReducer,
  WebsocketTypeAction
} from '../../../types/websocket'

const initialState: IWebsocketReducer = {
  isWebSocketConnected: false
}

export const websocketReducer = (
  state = initialState,
  action: WebsocketTypeAction
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
