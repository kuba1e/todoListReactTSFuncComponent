import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { TodoListItem } from '../TodoListItem'

import { ITodo } from '../../../types/generalTypes'

const todo: ITodo = {
  label: 'test',
  done: false,
  id: 1,
  order_num: 1
}

const onEditTodo = jest.fn()
const onSetEditedTodo = jest.fn()
const onToggleDone = jest.fn()
const onShowModal = jest.fn()

describe('todo list item component', () => {
  it('todo list item render', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={1}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('onSetEdited todo', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={1}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    fireEvent.doubleClick(screen.getByRole('listitem'))

    expect(onSetEditedTodo).toBeCalled()
  })

  it('show delete button', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={1}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByTestId('delete-btn'))
    expect(screen.getByTestId('delete-btn')).toHaveClass('delete-btn--active')
  })

  it('onShowModal', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={1}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('delete-btn'))
    expect(onShowModal).toBeCalled()
  })
})
