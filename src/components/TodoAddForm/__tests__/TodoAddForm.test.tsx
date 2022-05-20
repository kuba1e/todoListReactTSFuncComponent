import { fireEvent, render, screen, act } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import store from '../../../store'
import { TodoAddForm } from '../TodoAddForm'

describe('render todo add form component', () => {
  it('render todo add form', () => {
    render(
      <Provider store={store}>
        <TodoAddForm />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/done/i)).toBeInTheDocument()
  })

  it('onChange input todo add form', async () => {
    render(
      <Provider store={store}>
        <TodoAddForm />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/done/i)).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'test' }
      })
    })

    await act(() => {
      expect(screen.getByDisplayValue('test')).not.toBeNull()
    })
  })

  it('Clear input after submitting form', async () => {
    render(
      <Provider store={store}>
        <TodoAddForm />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/done/i)).toBeInTheDocument()

    await act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'test' }
      })
      fireEvent.blur(screen.getByRole('textbox'))
    })

    await act(() => {
      expect(screen.queryByDisplayValue('test')).toBeNull()
    })
  })

  it('Form validation', async () => {
    render(
      <Provider store={store}>
        <TodoAddForm />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/done/i)).toBeInTheDocument()
    await act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'te' } })
      fireEvent.blur(screen.getByRole('textbox'))
    })

    await act(() => {
      expect(screen.getByRole('textbox')).toHaveClass('todo__form-input--error')
    })
  })
})
