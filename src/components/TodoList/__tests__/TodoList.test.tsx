import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import { TodoList } from '../TodoList'
import store from '../../../store'
import { act } from 'react-dom/test-utils'

import * as selector from '../../../hooks/useTypedSelector'

describe('todo list component', () => {
  const useTypedSelector = jest.spyOn(selector, 'useTypedSelector')
  const useDispatchHook = jest.spyOn(selector, 'useDispatchHook')
  useTypedSelector.mockReturnValueOnce({
    todosData: [
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: false
      }
    ],
    loading: 'succeded',
    error: '',
    filterValue: 'all'
  })

  useDispatchHook.mockReturnValue(jest.fn())

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('todo list render', async () => {
    const { debug } = await render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    debug()
    await act(() => {
      expect(screen.getByText('test')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('delete-btn'))

    await act(() => {
      expect(useDispatchHook).toBeCalled()
    })
  })
})
