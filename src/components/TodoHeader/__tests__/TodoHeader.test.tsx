import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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
    expect(screen.getByRole('button')).not.toHaveClass(
      'select-all-btn--selected'
    )
  })

  it('toggleAllDoneTodo header', () => {
    render(
      <Provider store={store}>
        <TodoHeader todos={[]} toggleAllDoneTodo={toggleAllDoneTodo} />
      </Provider>
    )

    expect(screen.getByTestId('todo-header')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(toggleAllDoneTodo).toBeCalled()
  })

  it('Toggle button does not have classname', () => {
    render(
      <Provider store={store}>
        <TodoHeader todos={[]} toggleAllDoneTodo={toggleAllDoneTodo} />
      </Provider>
    )

    expect(screen.getByTestId('todo-header')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(toggleAllDoneTodo).toBeCalled()
  })

  it('Toggle button has classname', () => {
    render(
      <Provider store={store}>
        <TodoHeader
          todos={[
            {
              id: 1,
              done: true,
              label: 'test',
              order_num: 1
            }
          ]}
          toggleAllDoneTodo={toggleAllDoneTodo}
        />
      </Provider>
    )

    expect(screen.getByTestId('todo-header')).toBeInTheDocument()

    expect(screen.getByRole('button')).toHaveClass('select-all-btn--selected')
  })
})
