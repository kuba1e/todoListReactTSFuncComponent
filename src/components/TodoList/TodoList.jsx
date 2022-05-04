import React, { useEffect, useState } from 'react'
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
  sendToDeleteTodo,
  checkAuth
} from '../../features/todos'
import { getFilteredTodosList } from '../../helpers'

import emitter from '../../EventEmitter'

export const TodoList = () => {
  const [isConfirmModalActive, setConfirmModalActive] = useState(false)
  const [editedTodoActive, setEditedTodoActive] = useState(-1)
  const [id, setId] = useState(-1)

  const { todosData, loading, error, filterValue } = useSelector(
    ({ todos }) => todos
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
    dispatch(fetchTodos())

    emitter.subscribe('MODAL_CLOSE_BTN', onCloseHandler)
    emitter.subscribe('MODAL_SHOW_BTN', onShowBtnHandler)
    emitter.subscribe('MODAL_DELETE_TODO', onDeleteTodoHandler)
    emitter.subscribe('SET_EDITED_TODO_ACTIVE', onEditedTodoActive)

    return () => {
      emitter.deleteSubscribe('MODAL_CLOSE_BTN', onCloseHandler)
      emitter.deleteSubscribe('MODAL_SHOW_BTN', onShowBtnHandler)
      emitter.deleteSubscribe('MODAL_DELETE_TODO', onDeleteTodoHandler)
      emitter.deleteSubscribe('SET_EDITED_TODO_ACTIVE', onEditedTodoActive)
    }
  }, [])

  const onCloseHandler = () => {
    setConfirmModalActive(false)
  }

  const onShowBtnHandler = (id) => {
    setConfirmModalActive(true)
    setId(id)
  }

  const onDeleteTodoHandler = (id) => {
    dispatch(sendToDeleteTodo(id))
  }

  const onEditedTodoActive = (editedTodoActive) => {
    setEditedTodoActive(editedTodoActive)
  }

  const onDismiss = () => {
    emitter.emit('MODAL_CLOSE_BTN')
  }

  const onConfirm = ({ id }) => {
    emitter.emit('MODAL_DELETE_TODO', id)
    emitter.emit('MODAL_CLOSE_BTN')
  }

  const todosForRendering = getFilteredTodosList(filterValue, todosData)

  const confirmodal = isConfirmModalActive ? (
    <ConfirmModal onConfirm={onConfirm} onDismiss={onDismiss} id={id}>
      Do you want to delete?
    </ConfirmModal>
  ) : null

  const todosHeader =
    loading === 'succeded' && !error ? (
      <TodoHeader
        todos={todosData}
        toggleAllDoneTodo={(done) => dispatch(sentToUpdateAllTodo(done))}
      />
    ) : null

  const todoElements =
    loading === 'succeded' && !error
      ? todosForRendering.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleDone={(todo) => dispatch(sentToUpdateTodo(todo))}
              onEditTodo={(todo) => dispatch(sentToUpdateTodo(todo))}
              editedTodo={editedTodoActive}
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
