import React, { useCallback, useState, FC, useEffect } from 'react'
import clsx from 'clsx'

import './TodoListItem.scss'

import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'

import { ITodo } from '../../types/generalTypes'

interface TodoListItem {
  todo: ITodo
  editedTodo: number
  onEditTodo: (todo: ITodo) => void
  onSetEditedTodo: (id: number) => void
  onToggleDone: (todo: ITodo) => void
  onShowModal: (id: number) => void
}

export const TodoListItem: FC<TodoListItem> = (props) => {
  const {
    todo,
    editedTodo,
    onEditTodo,
    onSetEditedTodo,
    onToggleDone,
    onShowModal
  } = props
  const [isButtonActive, setButtonActive] = useState(false)
  const [inputValue, setInputValue] = useState(todo.label)

  useEffect(() => {
    setInputValue(todo.label)
  }, [todo.label])

  const handleSetEditTodoActive = useCallback(() => {
    const { id } = todo
    onSetEditedTodo(id)
  }, [])

  const handleShowModal = useCallback(() => {
    const { id } = todo
    onShowModal(id)
  }, [])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inputValue) {
        onEditTodo({ ...todo, label: inputValue })
      } else {
        setInputValue(todo.label)
      }
      onSetEditedTodo(-1)
    },
    [inputValue]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    []
  )

  const onCheckboxChange = useCallback(() => {
    const { done } = todo
    onToggleDone({ ...todo, done: !done })
  }, [todo])

  const handleMouseEnter = useCallback(() => setButtonActive(true), [])
  const handleMouseLeave = useCallback(() => setButtonActive(false), [])

  const { id, done } = todo

  const isInputActive = editedTodo === id

  const todoLabel = (
    <p
      className={`todo__list-item-text ${
        done ? 'todo__list-item-text--done' : ''
      }`}
    >
      {inputValue}
    </p>
  )

  const todoEditInput = (
    <form
      className='todo__list-item-edit-form'
      onSubmit={handleSubmit}
      onBlur={handleSubmit}
      data-testid='submit-form'
    >
      <input
        className='todo__list-item-edit-input'
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
        data-testid='edit-input'
      />
    </form>
  )

  const todoBody = isInputActive ? todoEditInput : todoLabel

  return (
    <>
      <li
        className={clsx('todo__list-item')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleSetEditTodoActive}
        data-testid={`listitem-${todo.id}`}
      >
        <Checkbox
          className={clsx(isInputActive && 'checkbox--hide')}
          onChange={onCheckboxChange}
          checked={done}
          inputTestId={`checkbox-${todo.id}`}
          labelTestId={`checkbox-label-${todo.id}`}
        />
        {todoBody}
        <div
          className={clsx(
            'btns-container',
            isInputActive && 'btns-container--hide'
          )}
        >
          <Button
            className={clsx('edit-btn', isButtonActive && 'edit-btn--active')}
            onClick={handleSetEditTodoActive}
            data-testid={`edit-btn-${todo.id}`}
          />
          <Button
            className={clsx(
              'delete-btn',
              isButtonActive && 'delete-btn--active'
            )}
            onClick={handleShowModal}
            data-testid={`delete-btn-${todo.id}`}
          />
        </div>
      </li>
    </>
  )
}
