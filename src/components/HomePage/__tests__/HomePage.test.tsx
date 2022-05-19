import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../../../store'
import { HomePage } from '../HomePage'

describe('render home page component', () => {
  it('render home page', () => {
    render(
      <Router>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/todos/i)).toBeInTheDocument()
  })
})
