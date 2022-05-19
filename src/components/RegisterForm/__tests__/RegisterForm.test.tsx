import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../../../store'
import { RegisterForm } from '../RegisterForm'

describe('render todo add form component', () => {
  it('render todo add form', () => {
    render(
      <Router>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/password/i)).toBeInTheDocument()
  })
})
