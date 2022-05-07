import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './TodoFooter.scss'

import Button from '../UI/Button'

import {
  sendToDeleteCompletedTodos,
  setFilterValue
} from '../../store/actions/todos'

import { getCompletedQuantity, getTodoCount } from '../../helpers'

import { todosSelector } from '../../store/selectors'

const filters = [
  {
    id: 1,
    label: 'All',
    value: 'all'
  },
  { id: 2, label: 'Active', value: 'active' },
  {
    id: 3,
    label: 'Completed',
    value: 'completed'
  }
]

export const TodoFooter = () => {
  const { todosData, loading, filterValue } = useSelector(todosSelector)
  const dispatch = useDispatch()

  const handleDeleteCompletedTodo = useCallback(
    () => dispatch(sendToDeleteCompletedTodos(todosData)),
    [todosData]
  )

  if (loading === 'pending' || loading === 'failed') {
    return null
  }

  return (
    <div className='todo__control'>
      <div className='todo__control-count'>
        <span className='todo__control-count-info'>
          {getTodoCount(todosData)}
        </span>
        <span className='todo__control-count-info-text'>{` item${
          getTodoCount(todosData) > 1 ? 's ' : ' '
        }`}</span>
        left
      </div>
      <ul className='todo__control-filter-list'>
        {filters.map(({ id, label, value }) => {
          return (
            <li key={id} className='todo__control-filter-list-item'>
              <Button
                className={`filter-btn ${
                  value === filterValue ? 'filter-btn--checked' : ''
                }`}
                onClick={() => dispatch(setFilterValue(value))}
              >
                {label}
              </Button>
            </li>
          )
        })}
      </ul>
      <Button
        className={`clear-completed-btn ${
          getCompletedQuantity(todosData) ? 'clear-completed-btn--active' : ''
        }`}
        onClick={handleDeleteCompletedTodo}
      >
        Clear completed
      </Button>
    </div>
  )
}
