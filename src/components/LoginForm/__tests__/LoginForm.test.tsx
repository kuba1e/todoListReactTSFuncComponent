import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { LoginForm } from '../LoginForm'

import store from '../../../store'
import { setUserData, setAuthStatus } from '../../../store/actions/user'
import * as api from '../../../store/asyncFoo'

describe('render login form component', () => {
  it('render login form', () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
  })

  it('onChange input login form', async () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <LoginForm />
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

  it('form validation password/email', async () => {
    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <LoginForm />
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

  it('should handle send login form', async () => {
    const loginUserFunc = jest.spyOn(api, 'loginUserFunc')
    loginUserFunc.mockReturnValue(
      Promise.resolve({
        userInfo: {
          user: {
            email: 'test@gmail.com',
            id: '1',
            isActivated: true
          },
          accessToken: 'test',
          refreshToken: 'test'
        },
        notifications: []
      })
    )

    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <LoginForm />
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
        target: { value: 'test@gmail.com' }
      })
    })

    await act(() => {
      expect(screen.getByTestId('password')).toHaveDisplayValue('test123456')
      expect(screen.getByTestId('email')).toHaveDisplayValue('test@gmail.com')
    })

    await act(() => {
      fireEvent.click(screen.getByText(/sign/i))
    })

    await act(() => {
      expect(loginUserFunc).toBeCalledWith({
        email: 'test@gmail.com',
        password: 'test123456'
      })
    })
  })

  it('should handle send login form', async () => {
    store.dispatch(
      setUserData({
        id: '1',
        email: 'test@gmail.com',
        isActivated: true
      })
    )

    store.dispatch(setAuthStatus(true))

    const history = createMemoryHistory()

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </Router>
    )

    expect(screen.queryByRole('form')).toBeNull()
  })
})
