import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, act, fireEvent } from '@testing-library/react'

import { EditProfilePage } from '../EditProfilePage'

import store from '../../../store'
import { setUserData, setAuthStatus } from '../../../store/actions/user'
import * as api from '../../../store/asyncFoo'

describe('render editprofile page component', () => {
  it('render edit profile page', () => {
    render(
      <Provider store={store}>
        <EditProfilePage />
      </Provider>
    )

    expect(screen.getByTestId('form')).toHaveFormValues({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    })
  })

  it('on change inputs edit profile page', async () => {
    render(
      <Provider store={store}>
        <EditProfilePage />
      </Provider>
    )

    expect(screen.getByTestId('confirm-password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('current-password')).toBeInTheDocument()
    expect(screen.getByTestId('new-password')).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'test123456@gmail.com' }
      })
      fireEvent.change(screen.getByTestId('current-password'), {
        target: { value: 'test123456' }
      })
      fireEvent.change(screen.getByTestId('new-password'), {
        target: { value: 'test1234567' }
      })
      fireEvent.change(screen.getByTestId('confirm-password'), {
        target: { value: 'test1234567' }
      })
    })

    await act(() => {
      expect(screen.getByTestId('email')).toHaveDisplayValue(
        'test123456@gmail.com'
      )
      expect(screen.getByTestId('current-password')).toHaveDisplayValue(
        'test123456'
      )
      expect(screen.getByTestId('new-password')).toHaveDisplayValue(
        'test1234567'
      )
      expect(screen.getByTestId('confirm-password')).toHaveDisplayValue(
        'test1234567'
      )
    })
  })

  it('form validation password/email', async () => {
    render(
      <Provider store={store}>
        <EditProfilePage />
      </Provider>
    )

    expect(screen.getByTestId('confirm-password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('current-password')).toBeInTheDocument()
    expect(screen.getByTestId('new-password')).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'test123456' }
      })
      fireEvent.change(screen.getByTestId('current-password'), {
        target: { value: '' }
      })
      fireEvent.change(screen.getByTestId('new-password'), {
        target: { value: 'test12' }
      })
      fireEvent.change(screen.getByTestId('confirm-password'), {
        target: { value: 'test12345678' }
      })
    })

    await act(() => {
      fireEvent.blur(screen.getByTestId('email'))
      fireEvent.blur(screen.getByTestId('current-password'))
      fireEvent.blur(screen.getByTestId('new-password'))
      fireEvent.blur(screen.getByTestId('confirm-password'))
    })

    await act(() => {
      expect(screen.getByTestId('email')).toHaveClass('auth__form-input--error')
      expect(screen.getByTestId('current-password')).toHaveClass(
        'auth__form-input--error'
      )

      expect(screen.getByTestId('confirm-password')).toHaveClass(
        'auth__form-input--error'
      )
    })
  })

  it('form submit validation', async () => {
    render(
      <Provider store={store}>
        <EditProfilePage />
      </Provider>
    )

    expect(screen.getByTestId('form'))
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('current-password')).toBeInTheDocument()
    expect(screen.getByTestId('new-password')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toHaveFormValues({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    })

    await act(() => {
      fireEvent.submit(screen.getByTestId('form'))
    })

    await act(() => {
      expect(screen.getByTestId('email')).toHaveClass('auth__form-input--error')
      expect(screen.getByTestId('current-password')).toHaveClass(
        'auth__form-input--error'
      )
    })
  })

  it('should test send to update user data', async () => {
    const updateUserProfileFunc = jest.spyOn(api, 'updateUserProfileFunc')

    updateUserProfileFunc.mockReturnValue(
      Promise.resolve({
        email: 'test123456@gmail.com',
        id: '1',
        isActivated: true
      })
    )

    store.dispatch(
      setUserData({
        id: '1',
        email: 'test@gmail.com',
        isActivated: true
      })
    )

    store.dispatch(setAuthStatus(true))

    render(
      <Provider store={store}>
        <EditProfilePage />
      </Provider>
    )

    expect(screen.getByTestId('confirm-password')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('current-password')).toBeInTheDocument()
    expect(screen.getByTestId('new-password')).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'test123456@gmail.com' }
      })
      fireEvent.change(screen.getByTestId('current-password'), {
        target: { value: 'test123456' }
      })
      fireEvent.change(screen.getByTestId('new-password'), {
        target: { value: 'test1234567' }
      })
      fireEvent.change(screen.getByTestId('confirm-password'), {
        target: { value: 'test1234567' }
      })
    })

    await act(() => {
      expect(screen.getByTestId('email')).toHaveDisplayValue(
        'test123456@gmail.com'
      )
      expect(screen.getByTestId('current-password')).toHaveDisplayValue(
        'test123456'
      )
      expect(screen.getByTestId('new-password')).toHaveDisplayValue(
        'test1234567'
      )
      expect(screen.getByTestId('confirm-password')).toHaveDisplayValue(
        'test1234567'
      )
    })

    await act(() => {
      fireEvent.click(screen.getByText(/save/i))
    })

    await act(() => {
      expect(updateUserProfileFunc).toBeCalledWith({
        email: 'test123456@gmail.com',
        id: '1',
        oldPassword: 'test123456',
        newPassword: 'test1234567'
      })
    })

    await act(() => {
      screen.debug()
      expect(screen.getByTestId('form')).toHaveFormValues({
        email: 'test123456@gmail.com',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      })
    })
  })
})
