import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import TodoHeader from '../TodoHeader'
import store from '../../../store'

const toggleAllDoneTodo = jest.fn()

describe('render todo header component', () => {
  it('render todo header', () => {
    render(
      <Provider store={store}>
        <TodoHeader todos={[]} toggleAllDoneTodo={toggleAllDoneTodo} />
      </Provider>
    )

    expect(screen.getByTestId('todo-header')).toBeInTheDocument()
  })
})
