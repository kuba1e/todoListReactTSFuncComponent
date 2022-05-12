import React, { useCallback, useState, FC, useRef } from 'react'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import clsx from 'clsx'

import './TodoListItem.scss'

import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'

import { ITodo } from '../../types/generalTypes'

interface TodoListItem {
  todo: ITodo
  editedTodo: number
  onEditTodo: (todo: ITodo) => void
  onSetEditedTodo: (id: number) => void
  onToggleDone: (todo: ITodo) => void
  onShowModal: (id: number) => void
  onDrop: (draggableTodo: ITodo, dropebletodo: ITodo) => void
  onDragStart: (todo: ITodo) => void
}

export const TodoListItem: FC<TodoListItem> = ({
  todo,
  editedTodo,
  onEditTodo,
  onSetEditedTodo,
  onToggleDone,
  onShowModal,
  onDrop,
  onDragStart,
  ...props
}) => {
  const [isButtonActive, setButtonActive] = useState(false)
  const [inputValue, setInputValue] = useState(todo.label)
  const liElement = useRef<HTMLLIElement>(null)

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'todo',
    item: todo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const [{ handlerId }, drop] = useDrop<
    ITodo,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'todo',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: ITodo, monitor) {
      if (!liElement.current) {
        return
      }
      const dragIndex = item.order_num
      const hoverIndex = todo.order_num

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = liElement.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onDrop(item, todo)

      item.order_num = hoverIndex
    }
  })

  const handleSetEditTodoActive = useCallback(() => {
    const { id } = todo
    onSetEditedTodo(id)
  }, [])

  const handleShowModal = useCallback(() => {
    const { id } = todo
    onShowModal(id)
  }, [])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inputValue) {
        onEditTodo({ ...todo, label: inputValue })
      } else {
        setInputValue(todo.label)
      }
      onSetEditedTodo(-1)
    },
    [inputValue]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    []
  )

  const onCheckboxChange = () => {
    const { done } = todo
    onToggleDone({ ...todo, done: !done })
  }

  const handleMouseEnter = useCallback(() => setButtonActive(true), [])
  const handleMouseLeave = useCallback(() => setButtonActive(false), [])

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
      onSubmit={handleSubmit}
      onBlur={handleSubmit}
    >
      <input
        className='todo__list-item-edit-input'
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  )

  drag(drop(liElement))

  const todoBody = isInputActive ? todoEditInput : todoLabel

  if (isDragging) {
    return <li className='todo__list-item'></li>
  }

  return (
    <li
      {...props}
      className={clsx(
        'todo__list-item',
        isDragging && 'todo__list-item--draggable'
      )}
      ref={liElement}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleSetEditTodoActive}
    >
      <Checkbox
        className={clsx(isInputActive && 'checkbox--hide')}
        onChange={onCheckboxChange}
        checked={done}
      />
      {todoBody}
      <div
        className={clsx(
          'btns-container',
          isInputActive && 'btns-container--hide'
        )}
      >
        <Button
          className={clsx('edit-btn', isButtonActive && 'edit-btn--active')}
          onClick={handleSetEditTodoActive}
        />
        <Button
          className={clsx('delete-btn', isButtonActive && 'delete-btn--active')}
          onClick={handleShowModal}
        />
      </div>
    </li>
  )
}
