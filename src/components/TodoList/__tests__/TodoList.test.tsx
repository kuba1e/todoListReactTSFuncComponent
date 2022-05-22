import React from 'react'
import { screen } from '@testing-library/react'

import { TodoList } from '../TodoList'
import { renderWithContext } from '../../../helpers/testHelpers'
import { act } from 'react-dom/test-utils'
import * as api from '../../../store/asyncFoo'
import store from '../../../store'
import { fetchTodos } from '../../../store/actions/todos'

const getTodosSpy = jest.spyOn(api, 'fetchTodosFunc')
getTodosSpy.mockResolvedValue([
  {
    id: 2,
    label: 'updated',
    order_num: 2,
    done: true
  }
])

describe('todo list component', () => {
  it('todo list render', async () => {
    const { debug } = renderWithContext(<TodoList />)
    store.dispatch(fetchTodos())
    await act(() => {
      expect(screen.getAllByRole('list')).toBeInTheDocument()
    })
    debug()
  })
})
