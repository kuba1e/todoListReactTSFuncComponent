import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { TodoFooter } from '../TodoFooter'

import store from '../../../store'
import * as api from '../../../store/asyncFoo'

describe('test render todo footer component', () => {
  it('should test render todo footer', () => {
    render(
      <Provider store={store}>
        <TodoFooter />
      </Provider>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByTestId('filter-btn-all')).toHaveClass(
      'filter-btn--checked'
    )
  })

  it('should test filter todo footer button', async () => {
    render(
      <Provider store={store}>
        <TodoFooter />
      </Provider>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByTestId('filter-btn-all')).toHaveClass(
      'filter-btn--checked'
    )

    await act(() => {
      fireEvent.click(screen.getByTestId('filter-btn-completed'))
    })

    await act(() => {
      expect(screen.getByTestId('filter-btn-completed')).toHaveClass(
        'filter-btn--checked'
      )
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('filter-btn-active'))
    })

    await act(() => {
      expect(screen.getByTestId('filter-btn-active')).toHaveClass(
        'filter-btn--checked'
      )
    })
  })

  it('should test click clear completed todo footer button', async () => {
    const sendToDeleteCompletedTodoFunc = jest.spyOn(
      api,
      'sendToDeleteCompletedTodoFunc'
    )

    render(
      <Provider store={store}>
        <TodoFooter />
      </Provider>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()

    await act(() => {
      fireEvent.click(screen.getByTestId('clear-completed'))
    })

    await act(() => {
      expect(sendToDeleteCompletedTodoFunc).toBeCalledTimes(1)
    })
  })
})
