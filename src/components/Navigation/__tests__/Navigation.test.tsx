import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import store from '../../../store'
import { Navigation } from '../Navigation'

describe('render navigation component', () => {
  it('render navigation', () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/login/i)).toBeInTheDocument()
    expect(screen.getByText(/registration/i)).toBeInTheDocument()
  })
})
