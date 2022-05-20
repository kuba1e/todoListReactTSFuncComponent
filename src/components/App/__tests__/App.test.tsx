import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import store from '../../../store'
import { App } from '../App'

describe('render app component', () => {
  it('render app', () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )
    expect(screen.getByText(/todos/i)).toBeInTheDocument()
  })

  it('Home route', () => {
    const history = createMemoryHistory()
    history.push('/')
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/todos/i)).toBeInTheDocument()
  })

  it('Login route', async () => {
    const history = createMemoryHistory()
    history.push('/login')
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })

  it('Registration route', async () => {
    const history = createMemoryHistory()
    history.push('/registration')
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })

  it('No match route', async () => {
    const history = createMemoryHistory()
    history.push('/some/wrong/route')
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
