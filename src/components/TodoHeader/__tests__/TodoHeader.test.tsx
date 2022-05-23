import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import TodoHeader from '../TodoHeader'
import store from '../../../store'
import { ITodo } from 'types/generalTypes'

const doneTodos: ITodo[] = [
  {
    id: 1,
    label: 'test1',
    order_num: 1,
    done: true
  },
  {
    id: 1,
    label: 'test2',
    order_num: 2,
    done: true
  }
]

const todoTodos: ITodo[] = [
  {
    id: 1,
    label: 'test1',
    order_num: 1,
    done: false
  },
  {
    id: 1,
    label: 'test2',
    order_num: 2,
    done: false
  }
]

const toggleAllDoneTodo = jest.fn()

describe(' test render todo header component', () => {
  it('should test render todo header', () => {
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

  it('should handle toggleAllDoneTodo', () => {
    render(
      <Provider store={store}>
        <TodoHeader todos={todoTodos} toggleAllDoneTodo={toggleAllDoneTodo} />
      </Provider>
    )

    expect(screen.getByTestId('todo-header')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(toggleAllDoneTodo).toBeCalled()

    expect(screen.getByTestId('toggle-all')).toHaveClass(
      'select-all-btn--selected'
    )
  })

  it('should has classname with all done todos', () => {
    render(
      <Provider store={store}>
        <TodoHeader todos={doneTodos} toggleAllDoneTodo={toggleAllDoneTodo} />
      </Provider>
    )

    expect(screen.getByTestId('todo-header')).toBeInTheDocument()
    expect(screen.getByTestId('toggle-all')).toHaveClass(
      'select-all-btn--selected'
    )
  })
})
