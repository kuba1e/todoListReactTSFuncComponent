import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './TodoListItem.scss'

import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'
import emitter from '../../EventEmitter'

export const TodoListItem = ({
  todo,
  editedTodo,
  onEditTodo,
  onToggleDone
}) => {
  const [isButtonActive, setButtonActive] = useState(false)
  const [inputValue, setInputValue] = useState(todo.label)

  const onShowModal = () => {
    const { id } = todo
    emitter.emit('MODAL_SHOW_BTN', id)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (inputValue) {
      onEditTodo({ ...todo, label: inputValue })
    } else {
      setInputValue(todo.label)
      onShowModal()
    }
    emitter.emit('SET_EDITED_TODO_ACTIVE', -1)
  }

  const onInputChange = ({ target: { value } }) => setInputValue(value)

  const onDoubleClick = () => {
    const { id } = todo
    emitter.emit('SET_EDITED_TODO_ACTIVE', id)
  }

  const onCheckboxChange = () => {
    const { done } = todo
    onToggleDone({ ...todo, done: !done })
  }

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
      onSubmit={onSubmit}
      onBlur={onSubmit}
    >
      <input
        className='todo__list-item-edit-input'
        autoFocus
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  )

  const todoBody = isInputActive ? todoEditInput : todoLabel

  return (
    <li
      className='todo__list-item'
      onMouseEnter={() => setButtonActive(true)}
      onMouseLeave={() => setButtonActive(false)}
      onDoubleClick={onDoubleClick}
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
          onClick={() => emitter.emit('SET_EDITED_TODO_ACTIVE', id)}
        />
        <Button
          className={`delete-btn ${isButtonActive ? 'delete-btn--active' : ''}`}
          onClick={onShowModal}
        />
      </div>
    </li>
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onToggleDone: PropTypes.func,
  onEditTodo: PropTypes.func,
  editedTodo: PropTypes.number
}
