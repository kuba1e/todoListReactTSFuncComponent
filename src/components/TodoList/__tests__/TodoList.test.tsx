import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import { TodoList } from '../TodoList'

import store from '../../../store'

describe('todo list component', () => {
  it('todo list render', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
