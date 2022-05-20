import { websocketReducer } from '../websocketReducer'
import { setWebsocketConnection } from '../../../actions/user'

describe('test websocket connection status reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      isWebSocketConnected: false
    }

    expect(websocketReducer(undefined, { type: '', payload: '' })).toEqual(
      initialState
    )
  })

  it('should websocket conection status  changed', () => {
    const previousState = {
      isWebSocketConnected: false
    }

    const nextState = {
      isWebSocketConnected: true
    }

    expect(
      websocketReducer(previousState, setWebsocketConnection(true))
    ).toEqual(nextState)
  })
})
