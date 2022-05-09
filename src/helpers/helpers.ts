import { ITodo } from '../types'

export const getCompletedQuantity = (todos: ITodo[]): number => {
  return todos.filter((todo) => todo.done).length
}

export const areAllCompleted = (todos: ITodo[]): boolean => {
  return !(todos.length - getCompletedQuantity(todos)) && !!todos.length
}
export const getTodoCount = (todos: ITodo[]): number => {
  return todos.filter((todo) => !todo.done).length
}

export const getFilteredTodosList = (
  filterValue: string,
  todos: ITodo[]
): ITodo[] => {
  switch (filterValue) {
    case 'completed':
      return todos.filter((todo) => todo.done)
    case 'active':
      return todos.filter((todo) => !todo.done)
    default:
      return todos
  }
}

const getTheBiggestId = (todos: ITodo[]): number => {
  return (
    [...todos]
      .sort((prevTodo, nextTodo) => {
        return prevTodo.id - nextTodo.id
      })
      .at(-1).id + 1
  )
}

const generateId = (todos: ITodo[]): number => {
  if (!todos.length) {
    return 1
  }
  return getTheBiggestId(todos)
}

export const createTodo = (label: string, todos: ITodo[]): ITodo => {
  return {
    id: generateId(todos),
    label,
    done: false
  }
}

export const deleteTodo = (id: number, todos: ITodo[]): ITodo[] => {
  return todos.filter((todo) => todo.id !== id)
}

export const toggleAllDoneTodo = (status: boolean, todos: ITodo[]): ITodo[] => {
  return todos.map((todo) => {
    return { ...todo, done: status }
  })
}

export const clearCompletedTodo = (todos: ITodo[]): ITodo[] => {
  return todos.filter((todo) => !todo.done)
}

export const editTodo = (todoForEdit: ITodo, todos: ITodo[]): ITodo[] => {
  return todos.map((todo) => {
    if (todo.id === todoForEdit.id) {
      return {
        ...todoForEdit
      }
    }
    return todo
  })
}

export function isObjectEmpty<T>(data: T) {
  return !Object.keys(data).length
}
