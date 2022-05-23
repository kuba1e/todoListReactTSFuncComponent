import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { TodoList } from '../TodoList'
import store from '../../../store'
import * as api from '../../../store/asyncFoo'

describe('todo list component', () => {
  const fetchTodosFunc = jest.spyOn(api, 'fetchTodosFunc')
  fetchTodosFunc.mockReturnValueOnce(
    Promise.resolve([
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: false
      }
    ])
  )

  it('should test todo list', async () => {
    const { debug } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )

    debug()
  })
})
