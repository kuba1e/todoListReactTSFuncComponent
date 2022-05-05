import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './TodoList.scss'

import ConfirmModal from '../UI/ConfirmModal'
import TodoListItem from '../TodoListItem'
import Loader from '../Loader'
import TodoHeader from '../TodoHeader'
import ErrorIndicator from '../ErrorIndicator'

import {
  sentToUpdateAllTodo,
  fetchTodos,
  sentToUpdateTodo,
  sendToDeleteTodo
} from '../../store/todos'

import { getFilteredTodosList } from '../../helpers'
import { todosSelector } from '../../store/selectors'

export const TodoList = () => {
  const [isConfirmModalActive, setConfirmModalActive] = useState(false)
  const [editedTodoActive, setEditedTodoActive] = useState(-1)
  const [id, setId] = useState(-1)

  const { todosData, loading, error, filterValue } = useSelector(todosSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const handleCloseModal = useCallback(() => {
    setConfirmModalActive(false)
  }, [])

  const handleShowModal = useCallback((id) => {
    setConfirmModalActive(true)
    setId(id)
  }, [])

  const handleDeleteTodo = useCallback((id) => {
    dispatch(sendToDeleteTodo(id))
  }, [])

  const handleSetEditedTodoActive = useCallback((editedTodoActive) => {
    setEditedTodoActive(editedTodoActive)
  }, [])

  const handleConfirmModal = useCallback(({ id }) => {
    handleDeleteTodo(id)
    handleCloseModal()
  }, [])

  const handleToggleDone = useCallback(
    (todo) => dispatch(sentToUpdateTodo(todo)),
    []
  )

  const handleEditTodo = useCallback(
    (todo) => dispatch(sentToUpdateTodo(todo)),
    []
  )

  const handleAllDoneTodo = useCallback(
    (done) => dispatch(sentToUpdateAllTodo(done)),
    []
  )

  const todosForRendering = getFilteredTodosList(filterValue, todosData)

  const confirmodal = isConfirmModalActive ? (
    <ConfirmModal
      onConfirm={handleConfirmModal}
      onDismiss={handleCloseModal}
      id={id}
    >
      Do you want to delete?
    </ConfirmModal>
  ) : null

  const todosHeader =
    loading === 'succeded' && !error ? (
      <TodoHeader todos={todosData} toggleAllDoneTodo={handleAllDoneTodo} />
    ) : null

  const todoElements =
    loading === 'succeded' && !error
      ? todosForRendering.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleDone={handleToggleDone}
              onEditTodo={handleEditTodo}
              editedTodo={editedTodoActive}
              onSetEditedTodo={handleSetEditedTodoActive}
              onShowModal={handleShowModal}
            />
          )
        })
      : null

  const loader = loading === 'pending' && !error ? <Loader /> : null
  const errorIndicator =
    error && loading === 'failed' ? (
      <ErrorIndicator errorMessage={error} />
    ) : null

  return (
    <>
      {confirmodal}
      {errorIndicator}
      {todosHeader}
      <ul
        className={`todo__list ${
          loading === 'pending' ? 'todo__list--pending' : ''
        }`}
      >
        {loader}
        {todoElements}
      </ul>
    </>
  )
}
