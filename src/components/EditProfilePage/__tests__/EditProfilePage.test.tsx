import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, act, fireEvent } from '@testing-library/react'

import store from '../../../store'
import { EditProfilePage } from '../EditProfilePage'

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

  it('onChange inputs edit profile page', async () => {
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

  it('Form validation password/email', async () => {
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

  it('Form submit validation', async () => {
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
})
