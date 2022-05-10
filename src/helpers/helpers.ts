import { ITodo } from '../types/generalTypes'

export const getCompletedQuantity = (todos: ITodo[]) => {
  return todos.filter((todo) => todo.done).length
}

export const areAllCompleted = (todos: ITodo[]) => {
  return !(todos.length - getCompletedQuantity(todos)) && !!todos.length
}
export const getTodoCount = (todos: ITodo[]) => {
  return todos.filter((todo) => !todo.done).length
}

export const getFilteredTodosList = (filterValue: string, todos: ITodo[]) => {
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
  if (todos !== undefined) {
    return (
      [...todos]
        .sort((prevTodo, nextTodo) => {
          return prevTodo.id - nextTodo.id
        })
        .at(-1).id + 1
    )
  }
  return 1
}

const generateId = (todos: ITodo[]) => {
  if (!todos.length) {
    return 1
  }
  return getTheBiggestId(todos)
}

export const createTodo = (label: string, todos: ITodo[]) => {
  return {
    id: generateId(todos),
    label,
    done: false
  }
}

export const deleteTodo = (id: number, todos: ITodo[]) => {
  return todos.filter((todo) => todo.id !== id)
}

export const toggleAllDoneTodo = (status: boolean, todos: ITodo[]) => {
  return todos.map((todo) => {
    return { ...todo, done: status }
  })
}

export const clearCompletedTodo = (todos: ITodo[]) => {
  return todos.filter((todo) => !todo.done)
}

export const editTodo = (todoForEdit: ITodo, todos: ITodo[]) => {
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
