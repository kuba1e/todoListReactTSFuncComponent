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
  it('todo list item render without input', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={0}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('todo list item render with input', () => {
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
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('show/hide delete button', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={0}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByTestId('delete-btn-1'))
    expect(screen.getByTestId('delete-btn-1')).toHaveClass('delete-btn--active')

    fireEvent.mouseLeave(screen.getByTestId('delete-btn-1'))
    expect(screen.getByTestId('delete-btn-1')).not.toHaveClass(
      'delete-btn--active'
    )
  })

  it('onShowModal handler', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={0}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('delete-btn-1'))
    expect(onShowModal).toBeCalled()

    fireEvent.click(screen.getByTestId('edit-btn-1'))
    expect(onShowModal).toBeCalled()
  })

  it('onEditTodo handler', () => {
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
    expect(screen.getByRole('textbox')).toBeInTheDocument()

    fireEvent.submit(screen.getByTestId('submit-form'))

    expect(onEditTodo).toBeCalled()
  })

  it('onSetEditedTodo handler', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={0}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    expect(screen.queryByRole('textbox')).toBeNull()

    fireEvent.doubleClick(screen.getByRole('listitem'))
    expect(onSetEditedTodo).toBeCalled()
  })

  it('onToggleDone handler', () => {
    render(
      <TodoListItem
        todo={todo}
        editedTodo={0}
        onEditTodo={onEditTodo}
        onSetEditedTodo={onSetEditedTodo}
        onToggleDone={onToggleDone}
        onShowModal={onShowModal}
      />
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggleDone).toBeCalled()
  })
})
