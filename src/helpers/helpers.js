export const getCompletedQuantity = (todos) => {
  return todos.filter((todo) => todo.done).length
}

export const areAllCompleted = (todos) => {
  return !(todos.length - getCompletedQuantity(todos)) && !!todos.length
}
export const getTodoCount = (todos) => {
  return todos.filter((todo) => !todo.done).length
}

export const getFilteredTodosList = (filterValue, todos) => {
  switch (filterValue) {
    case 'completed':
      return todos.filter((todo) => todo.done)
    case 'active':
      return todos.filter((todo) => !todo.done)
    default:
      return todos
  }
}

const getTheBiggestId = (todos) => {
  return (
    [...todos]
      .sort((prevTodo, nextTodo) => {
        const subtractionResult = prevTodo - nextTodo
        if (subtractionResult < 0) {
          return -1
        }
        if (subtractionResult > 0) {
          return 1
        }
        return 0
      })
      .at(-1).id + 1
  )
}

const generateId = (todos) => {
  if (!todos.length) {
    return 1
  }
  return getTheBiggestId(todos)
}

export const createTodo = (label, todos) => {
  return {
    id: generateId(todos),
    label,
    done: false
  }
}

export const deleteTodo = (id, todos) => {
  return todos.filter((todo) => todo.id !== id)
}

export const toggleAllDoneTodo = (status, todos) => {
  return todos.map((todo) => {
    return { ...todo, done: status }
  })
}

export const clearCompletedTodo = (todos) => {
  return todos.filter((todo) => !todo.done)
}

export const editTodo = (todoForEdit, todos) => {
  return todos.map((todo) => {
    if (todo.id === todoForEdit.id) {
      return {
        ...todoForEdit
      }
    }
    return todo
  })
}

export const isObjectEmpty = (data) => {
  return !Object.keys(data).length
}
