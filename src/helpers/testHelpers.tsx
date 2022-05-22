import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { getStoreWithState } from '../store/store'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { RootState } from '../store/reducers/rootReducer'

export const renderWithContext = (
  element: React.ReactElement,
  state?: RootState
) => {
  const history = createMemoryHistory()

  const store = getStoreWithState(state)

  const utils = render(
    <Router location={history.location} navigator={history}>
      <Provider store={store}>{element}</Provider>{' '}
    </Router>
  )

  return { store, ...utils }
}
