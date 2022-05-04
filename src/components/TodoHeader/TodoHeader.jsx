import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './TodoHeader.scss'

import Button from '../UI/Button'
import TodoAddForm from '../TodoAddForm'

import { areAllCompleted } from '../../helpers'

const TodoHeader = ({ todos, toggleAllDoneTodo }) => {
  const [isSelected, setSelected] = useState(areAllCompleted(todos))

  useEffect(() => {
    if (isSelected === areAllCompleted(todos)) {
      return
    }
    toggleAllDoneTodo(isSelected)
  }, [isSelected])

  const handleSelectAll = useCallback(() => {
    setSelected((isSelected) => !isSelected)
  }, [])

  return (
    <div className='todo__form-container'>
      <Button
        className={`select-all-btn ${
          isSelected ? 'select-all-btn--selected' : ''
        }`}
        onClick={handleSelectAll}
      />
      <TodoAddForm />
    </div>
  )
}

TodoHeader.propTypes = {
  toggleAllDoneTodo: PropTypes.func,
  todos: PropTypes.array
}

export default TodoHeader
