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

const getTheBiggestValue = (todos: ITodo[] | [], key: string): number => {
  if (todos !== undefined) {
    return (
      [...todos]
        .sort((prevTodo, nextTodo) => {
          return prevTodo[key] - nextTodo[key]
        })
        .at(-1)[key] + 1
    )
  }
  return 1
}

export const generateValue = (todos: ITodo[], key: string) => {
  if (!todos.length) {
    return 1
  }
  return getTheBiggestValue(todos, key)
}

export const createTodo = (label: string, todos: ITodo[]) => {
  return {
    id: generateValue(todos, 'id'),
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

export const getResponseStatus = (status: number): number => {
  return Math.trunc(status / 100)
}

export const sortHandler = (prevElem: ITodo, nextElem: ITodo) =>
  prevElem.id - nextElem.id

export const findIndex = (todos: ITodo[], id: number) => {
  return todos.findIndex((todo) => todo.id === id)
}

export const sortArray = (
  todos: ITodo[],
  dragableIndex: number,
  dropableIndex: number | undefined
) => {
  console.log(dragableIndex, dropableIndex)

  const todosCopy = [...todos]
  const [draggableTodo] = todosCopy.splice(dragableIndex, 1)
  if (dropableIndex !== undefined) {
    todosCopy.splice(dropableIndex, 0, draggableTodo)
  }

  return todosCopy
}
