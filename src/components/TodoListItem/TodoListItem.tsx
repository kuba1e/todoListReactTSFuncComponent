import React, { useCallback, useState, FC } from 'react'
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
  onDrop: (todo: ITodo) => void
  onDragStart: (todo: ITodo) => void
}

export const TodoListItem: FC<TodoListItem> = ({
  todo,
  editedTodo,
  onEditTodo,
  onSetEditedTodo,
  onToggleDone,
  onShowModal,
  onDrop,
  onDragStart
}) => {
  const [isButtonActive, setButtonActive] = useState(false)
  const [inputValue, setInputValue] = useState(todo.label)
  const [isDraggable, setIsDraggable] = useState(false)

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

  const onCheckboxChange = () => {
    const { done } = todo
    onToggleDone({ ...todo, done: !done })
  }

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      onDragStart(todo)
    },
    []
  )

  const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
    setIsDraggable(false)
    onDrop(todo)
  }

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      event.preventDefault()
      setIsDraggable(true)
    },
    []
  )

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      setIsDraggable(false)
    },
    []
  )

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
    >
      <input
        className='todo__list-item-edit-input'
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  )

  const todoBody = isInputActive ? todoEditInput : todoLabel

  return (
    <li
      className={clsx(
        'todo__list-item',
        isDraggable && 'todo__list-item--draggable'
      )}
      draggable={true}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleSetEditTodoActive}
    >
      <Checkbox
        className={clsx(isInputActive && 'checkbox--hide')}
        onChange={onCheckboxChange}
        checked={done}
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
        />
        <Button
          className={clsx('delete-btn', isButtonActive && 'delete-btn--active')}
          onClick={handleShowModal}
        />
      </div>
    </li>
  )
}
