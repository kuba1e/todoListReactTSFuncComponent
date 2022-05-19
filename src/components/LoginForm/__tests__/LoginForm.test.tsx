import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../../../store'
import { LoginForm } from '../LoginForm'

describe('render login form component', () => {
  it('render login form', () => {
    render(
      <Router>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/email/i)).toBeInTheDocument()
  })
})
