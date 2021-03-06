import React, { useCallback, useEffect, useState, FC } from 'react'

import './TodoHeader.scss'

import Button from '../UI/Button'
import TodoAddForm from '../TodoAddForm'

import { areAllCompleted } from '../../helpers'
import { ITodo } from '../../types/generalTypes'

interface TodoHeader {
  todos: ITodo[]
  toggleAllDoneTodo: (isSelected: boolean) => void
}

const TodoHeader: FC<TodoHeader> = ({ todos, toggleAllDoneTodo }) => {
  const [isSelected, setSelected] = useState(areAllCompleted(todos))

  useEffect(() => {
    if (isSelected === areAllCompleted(todos)) {
      return
    }
    toggleAllDoneTodo(isSelected)
  }, [isSelected])

  useEffect(() => {
    setSelected(areAllCompleted(todos))
  }, [todos])

  const handleSelectAll = useCallback(() => {
    setSelected((isSelected) => !isSelected)
  }, [])

  return (
    <div className='todo__form-container' data-testid='todo-header'>
      <Button
        className={`select-all-btn ${
          isSelected ? 'select-all-btn--selected' : ''
        }`}
        onClick={handleSelectAll}
        data-testid='toggle-all'
      />
      <TodoAddForm />
    </div>
  )
}

export default TodoHeader
