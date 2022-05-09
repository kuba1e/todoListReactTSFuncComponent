import React, { useCallback, useEffect, useState, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './TodoList.scss'

import ConfirmModal from '../UI/ConfirmModal'
import TodoListItem from '../TodoListItem'
import Loader from '../Loader'
import TodoHeader from '../TodoHeader'
import ErrorIndicator from '../ErrorIndicator'

import {
  sendToUpdateAllTodo,
  fetchTodos,
  sendToUpdateTodo,
  sendToDeleteTodo
} from '../../store/actions/todos'

import { getFilteredTodosList } from '../../helpers'
import { todosSelector } from '../../store/selectors'

import { ITodo } from '../../types/types'

export const TodoList: FC = () => {
  const [isConfirmModalActive, setConfirmModalActive] = useState(false)
  const [editedTodoActive, setEditedTodoActive] = useState(-1)
  const [id, setId] = useState(-1)

  const { todosData, loading, error, filterValue } = useSelector(todosSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const handleCloseModal = useCallback((): void => {
    setConfirmModalActive(false)
  }, [])

  const handleShowModal = useCallback((id: number): void => {
    setConfirmModalActive(true)
    setId(id)
  }, [])

  const handleDeleteTodo = useCallback((id: number): void => {
    dispatch(sendToDeleteTodo(id))
  }, [])

  const handleSetEditedTodoActive = useCallback(
    (editedTodoActive: number): void => {
      setEditedTodoActive(editedTodoActive)
    },
    []
  )

  const handleConfirmModal = useCallback((id: number) => {
    handleDeleteTodo(id)
    handleCloseModal()
  }, [])

  const handleToggleDone = useCallback((todo: ITodo): void => {
    dispatch(sendToUpdateTodo(todo))
  }, [])

  const handleEditTodo = useCallback((todo: ITodo): void => {
    dispatch(sendToUpdateTodo(todo))
  }, [])

  const handleAllDoneTodo = useCallback((done: boolean): void => {
    dispatch(sendToUpdateAllTodo(done))
  }, [])

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
      ? todosForRendering.map((todo: ITodo) => {
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
