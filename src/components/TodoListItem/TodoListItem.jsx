import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import './TodoListItem.scss'

import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'

export const TodoListItem = ({
  todo,
  editedTodo,
  onEditTodo,
  onSetEditedTodo,
  onToggleDone,
  onShowModal
}) => {
  const [isButtonActive, setButtonActive] = useState(false)
  const [inputValue, setInputValue] = useState(todo.label)

  const handleSetEditTodoActive = useCallback(() => {
    const { id } = todo
    onSetEditedTodo(id)
  }, [])

  const handleShowModal = useCallback(() => {
    const { id } = todo
    onShowModal(id)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (inputValue) {
        onEditTodo({ ...todo, label: inputValue })
      } else {
        setInputValue(todo.label)
        onShowModal()
      }
      onSetEditedTodo(-1)
    },
    [inputValue]
  )

  const handleInputChange = useCallback(
    ({ target: { value } }) => setInputValue(value),
    []
  )

  const onCheckboxChange = () => {
    const { done } = todo
    onToggleDone({ ...todo, done: !done })
  }

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
      className='todo__list-item'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleSetEditTodoActive}
    >
      <Checkbox
        className={isInputActive ? 'checkbox--hide' : ''}
        onChange={onCheckboxChange}
        checked={done}
      />
      {todoBody}
      <div
        className={`btns-container ${
          isInputActive ? 'btns-container--hide' : ''
        }`}
      >
        <Button
          className={`edit-btn ${isButtonActive ? 'edit-btn--active' : ''}`}
          onClick={handleSetEditTodoActive}
        />
        <Button
          className={`delete-btn ${isButtonActive ? 'delete-btn--active' : ''}`}
          onClick={handleShowModal}
        />
      </div>
    </li>
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onToggleDone: PropTypes.func,
  onEditTodo: PropTypes.func,
  onSetEditedTodo: PropTypes.func,
  editedTodo: PropTypes.number,
  onShowModal: PropTypes.func
}
