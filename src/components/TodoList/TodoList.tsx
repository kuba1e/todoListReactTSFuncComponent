import React, { useCallback, useEffect, useState, FC } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'

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
  editTodo
} from '../../store/actions/todos'

import { getFilteredTodosList, sortHandler } from '../../helpers'
import { todosSelector, filterValueSelector } from '../../store/selectors'

import { ITodo } from '../../types/generalTypes'

import { useTypedSelector, useDispatchHook } from '../../hooks/useTypedSelector'

export const TodoList: FC = () => {
  const [isConfirmModalActive, setConfirmModalActive] = useState(false)
  const [editedTodoActive, setEditedTodoActive] = useState(-1)
  const [id, setId] = useState(-1)

  const { todosData, loading, error } = useTypedSelector(todosSelector)
  const { filterValue } = useTypedSelector(filterValueSelector)

  const dispatch = useDispatchHook()

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

  const handleSort = useCallback(
    (currentDraggableIndex: number, dropIndex: number | undefined) => {
      if (dropIndex !== undefined) {
        let order_num: number | undefined

        if (dropIndex === 0) {
          order_num = todosData[0].order_num / 2
        }
        if (dropIndex === todosData.length - 1) {
          order_num = todosData[todosData.length - 1].order_num + 1
        }
        if (dropIndex !== 0 && dropIndex !== todosData.length - 1) {
          if (currentDraggableIndex > dropIndex) {
            order_num =
              (todosData[dropIndex].order_num +
                todosData[dropIndex - 1].order_num) /
              2
          }
          if (currentDraggableIndex < dropIndex) {
            order_num =
              (todosData[dropIndex].order_num +
                todosData[dropIndex + 1].order_num) /
              2
          }
        }
        if (order_num !== undefined) {
          const updatedTodo = { ...todosData[currentDraggableIndex], order_num }
          if (updatedTodo !== undefined) {
            dispatch(editTodo(updatedTodo))
            dispatch(sendToUpdateAllTodo())
          }
        }
      }
    },
    [todosData]
  )

  const handleDrop = useCallback(
    (result: DropResult) => {
      if (result !== undefined) {
        handleSort(result.source.index, result.destination?.index)
      }
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
      ? todosForRendering
          .sort(sortHandler)
          .map((todo: ITodo, index: number) => {
            return (
              <Draggable draggableId={`${todo.id}`} key={todo.id} index={index}>
                {(provided) => {
                  return (
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
                  )
                }}
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
          {(provided) => {
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
