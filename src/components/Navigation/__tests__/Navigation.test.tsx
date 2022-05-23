import React from 'react'
import { Provider } from 'react-redux'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import store from '../../../store'
import { Navigation } from '../Navigation'
import { setUserData, setAuthStatus } from '../../../store/actions/user'
import * as api from '../../../store/asyncFoo'

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

  it('render navigation when loginned user', () => {
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
          <Navigation />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()
  })

  it('render navigation when user logouted ', async () => {
    const logoutUserFunc = jest.spyOn(api, 'logoutUserFunc')
    logoutUserFunc.mockReturnValue(Promise.resolve())

    const history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()

    await act(() => {
      fireEvent.click(screen.getByText(/logout/i))
    })

    await act(() => {
      expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
  })
})
