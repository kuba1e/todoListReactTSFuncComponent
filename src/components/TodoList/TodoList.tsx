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
  sendToDeleteTodo,
  sendToUpdateTodoOrder
} from '../../store/actions/todos'

import { getFilteredTodosList, sortHandler, findIndex } from '../../helpers'
import { todosSelector } from '../../store/selectors'

import { ITodo } from '../../types/generalTypes'
import clsx from 'clsx'

export const TodoList: FC = () => {
  const [currentDraggable, setCurrentDraggable] = useState<ITodo>()
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

  const handleShowModal = useCallback((id: number) => {
    setConfirmModalActive(true)
    setId(id)
  }, [])

  const handleDeleteTodo = useCallback((id: number) => {
    dispatch(sendToDeleteTodo(id))
  }, [])

  const handleSetEditedTodoActive = useCallback((editedTodoActive: number) => {
    setEditedTodoActive(editedTodoActive)
  }, [])

  const handleConfirmModal = useCallback((id: number) => {
    handleDeleteTodo(id)
    handleCloseModal()
  }, [])

  const handleToggleDone = useCallback((todo: ITodo) => {
    dispatch(sendToUpdateTodo(todo))
  }, [])

  const handleEditTodo = useCallback((todo: ITodo) => {
    dispatch(sendToUpdateTodo(todo))
  }, [])

  const handleAllDoneTodo = useCallback((done: boolean) => {
    dispatch(sendToUpdateAllTodo(done))
  }, [])

  const handleDrop = useCallback(
    (currentDraggable: ITodo, hoverDragable: ITodo) => {
      if (currentDraggable !== undefined) {
        if (id === currentDraggable.id) {
          return
        }
        let order_num: number | undefined

        const currentDraggableIndex = findIndex(todosData, currentDraggable.id)
        const dropIndex = findIndex(todosData, hoverDragable.id)

        if (dropIndex === 0) {
          order_num = todosData[0].order_num / 2
        }
        if (dropIndex === todosData.length - 1) {
          order_num = todosData[todosData.length - 1].order_num + 1
        }
        if (dropIndex !== 0 && dropIndex !== todosData.length - 1) {
          if (currentDraggableIndex > dropIndex) {
            order_num =
              (hoverDragable.order_num + todosData[dropIndex - 1].order_num) / 2
          }
          if (currentDraggableIndex < dropIndex) {
            order_num =
              (hoverDragable.order_num + todosData[dropIndex + 1].order_num) / 2
          }
        }
        if (order_num !== undefined) {
          const updatedTodo = { ...currentDraggable, order_num }
          if (updatedTodo !== undefined) {
            dispatch(sendToUpdateTodoOrder(updatedTodo))
          }
        }
      }
    },
    [todosData, currentDraggable]
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
      ? todosForRendering.sort(sortHandler).map((todo: ITodo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleDone={handleToggleDone}
              onEditTodo={handleEditTodo}
              editedTodo={editedTodoActive}
              onSetEditedTodo={handleSetEditedTodoActive}
              onShowModal={handleShowModal}
              onDrop={handleDrop}
              onDragStart={setCurrentDraggable}
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
        className={clsx(
          'todo__list',
          loading === 'pending' && 'todo__list--pending'
        )}
      >
        {loader}
        {todoElements}
      </ul>
    </>
  )
}
