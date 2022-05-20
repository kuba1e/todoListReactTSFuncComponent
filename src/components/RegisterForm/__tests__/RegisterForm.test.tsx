import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import store from '../../../store'
import { RegisterForm } from '../RegisterForm'

describe('render register form component', () => {
  it('render register form', () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
  })

  it('onChange input register form', async () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByTestId('password'), {
        target: { value: 'test123456' }
      })
    })

    await act(() => {
      expect(screen.getByTestId('password')).toHaveDisplayValue('test123456')
    })

    await act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'test123456' }
      })
    })

    await act(() => {
      expect(screen.getByTestId('email')).toHaveDisplayValue('test123456')
    })
  })

  it('Form validation password/email', async () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByTestId('password'), {
        target: { value: 'test' }
      })

      fireEvent.blur(screen.getByTestId('password'))
    })

    await act(() => {
      expect(screen.getByTestId('password')).toHaveClass(
        'auth__form-input--error'
      )
    })

    await act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'test' }
      })

      fireEvent.blur(screen.getByTestId('email'))
    })

    await act(() => {
      expect(screen.getByTestId('email')).toHaveClass('auth__form-input--error')
    })
  })

  it('Clear input after submitting form', async () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByTestId('password'), {
        target: { value: 'test123456' }
      })

      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'test123456@gmail.com' }
      })

      fireEvent.click(screen.getByRole('button'))
    })

    await act(() => {
      expect(screen.getByTestId('password')).toHaveDisplayValue('')
      expect(screen.getByTestId('email')).toHaveDisplayValue('')
    })
  })
})
