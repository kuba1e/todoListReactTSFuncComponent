import React, { useCallback, useEffect, useState, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

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
  toggleAllDoneTodo,
  updateTodos
} from '../../store/actions/todos'

import { getFilteredTodosList, sortHandler, sortArray } from '../../helpers'
import { todosSelector } from '../../store/selectors'

import { ITodo } from '../../types/generalTypes'

export const TodoList: FC = () => {
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
    dispatch(toggleAllDoneTodo(done))
    dispatch(sendToUpdateAllTodo())
  }, [])

  const handleDrop = useCallback(
    (result, provided) => {
      const updatedArray = sortArray(
        todosData,
        result.source.index,
        result.destination.index
      )
      console.log(updatedArray)
      dispatch(updateTodos(updatedArray))
      dispatch(sendToUpdateAllTodo())
    },
    [todosData]
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
      ? todosForRendering.map((todo: ITodo, index: number) => {
          return (
            <Draggable draggableId={`${todo.id}`} key={todo.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  <TodoListItem
                    todo={todo}
                    onToggleDone={handleToggleDone}
                    onEditTodo={handleEditTodo}
                    editedTodo={editedTodoActive}
                    onSetEditedTodo={handleSetEditedTodoActive}
                    onShowModal={handleShowModal}
                  />
                </div>
              )}
            </Draggable>
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
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId='10000000'>
          {(provided, snapshot) => {
            return (
              <ul
                className={`todo__list ${
                  loading === 'pending' ? 'todo__list--pending' : ''
                }`}
                ref={provided.innerRef}
              >
                {loader}
                {todoElements}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
      </DragDropContext>
    </>
  )
}
