import { INotification, IStatistic, ITodo } from '../types/generalTypes'

export const getCompletedQuantity = (todos: ITodo[]) => {
  if (!Array.isArray(todos)) {
    return -1
  }
  return todos.filter((todo) => todo.done).length
}

export const areAllCompleted = (todos: ITodo[]) => {
  if (!Array.isArray(todos)) {
    return false
  }
  return !(todos.length - getCompletedQuantity(todos)) && !!todos.length
}
export const getTodoCount = (todos: ITodo[]) => {
  if (!Array.isArray(todos)) {
    return -1
  }
  return todos.filter((todo) => !todo.done).length
}

export const getFilteredTodosList = (filterValue: string, todos: ITodo[]) => {
  if (!Array.isArray(todos) || typeof filterValue !== 'string') {
    return todos
  }
  switch (filterValue) {
    case 'completed':
      return todos.filter((todo) => todo.done)
    case 'active':
      return todos.filter((todo) => !todo.done)
    default:
      return todos
  }
}

export const generateValue = (todos: ITodo[] | [], key: string): number => {
  if (!Array.isArray(todos) || typeof key !== 'string') {
    return 0
  }

  const todosCopy = [...todos]
  if (todosCopy !== undefined && todos.length) {
    todosCopy.sort((prevTodo, nextTodo) => {
      return prevTodo[key] - nextTodo[key]
    })
    const lastTodo = todosCopy.at(-1)
    if (lastTodo !== undefined && typeof lastTodo[key] === 'number') {
      return lastTodo[key] + 1
    }
    return 0
  }
  return 1
}

export const createTodo = (label: string, todos: ITodo[]) => {
  if (!Array.isArray(todos) || typeof label !== 'string') {
    return {}
  }
  return {
    id: generateValue(todos, 'id'),
    label,
    done: false,
    order_num: generateValue(todos, 'order_num')
  }
}

export const deleteTodo = (id: number, todos: ITodo[]) => {
  if (!Array.isArray(todos) || typeof id !== 'number') {
    return todos
  }
  return todos.filter((todo) => todo.id !== id)
}

export const toggleAllDoneTodo = (status: boolean, todos: ITodo[]) => {
  if (!Array.isArray(todos) || typeof status !== 'boolean') {
    return todos
  }
  return todos.map((todo) => {
    return { ...todo, done: status }
  })
}

export const clearCompletedTodo = (todos: ITodo[]) => {
  if (!Array.isArray(todos)) {
    return todos
  }
  return todos.filter((todo) => !todo.done)
}

export const editTodo = (todoForEdit: ITodo, todos: ITodo[]) => {
  if (!Array.isArray(todos) || typeof todoForEdit !== 'object') {
    return todos
  }
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
  if (typeof data !== 'object' || data === null) {
    return false
  }
  return !Object.keys(data).length
}

export const getResponseStatus = (status: number): number => {
  if (typeof status !== 'number' || isNaN(status)) {
    throw new Error('Type of status is not a number')
  }
  return Math.trunc(status / 100)
}

export const sortHandler = (prevElem: ITodo, nextElem: ITodo) => {
  if (prevElem.order_num === undefined || nextElem.order_num === undefined) {
    return 0
  }

  return prevElem.order_num - nextElem.order_num
}

export const findIndex = (array: ITodo[] | INotification[], id: number) => {
  if (!Array.isArray(array) || typeof id !== 'number') {
    return -1
  }

  return array.findIndex((arrayElement) => arrayElement.id === id)
}

export const sortArray = (
  todos: ITodo[],
  dragableIndex: number,
  dropableIndex: number | undefined
) => {
  if (
    !Array.isArray(todos) ||
    dragableIndex === undefined ||
    dropableIndex === undefined ||
    dragableIndex === dropableIndex
  ) {
    return todos
  }

  const todosCopy = [...todos]
  const draggableOrdernum = todosCopy[dragableIndex].order_num

  if (dropableIndex !== undefined) {
    todosCopy[dragableIndex].order_num = todosCopy[dropableIndex].order_num
    todosCopy[dropableIndex].order_num = draggableOrdernum
  }
  return todosCopy
}

export const deleteNotification = (
  notifications: INotification[],
  id: number
) => {
  if (!Array.isArray(notifications) || typeof id !== 'number' || isNaN(id)) {
    return notifications
  }

  const notificationIndex = findIndex(notifications, id)
  if (notificationIndex === -1) {
    return notifications
  }
  return [
    ...notifications.slice(0, notificationIndex),
    { ...notifications[notificationIndex], hidden: true },
    ...notifications.slice(notificationIndex + 1)
  ]
}

export const getShorterText = (label: string, length: number) => {
  if (typeof label !== 'string' || typeof length !== 'number') {
    return label
  }
  const labelLength = label.length
  if (labelLength < length) {
    return label
  }

  return `${label.slice(0, length)}...`
}

export const filterHiddenNotifications = (notifications: Notification[]) => {
  if (!Array.isArray(notifications)) {
    return notifications
  }
  return notifications.filter((notification) => !notification.hidden)
}

export const getCurrentDate = () => {
  const dateNow = new Date()
  return `${dateNow.getDate()}.${dateNow.getMonth() + 1}`
}

export const getArrayForGraphRendering = (
  notificationsArray: INotification[]
) => {
  if (!Array.isArray(notificationsArray) || !notificationsArray.length) {
    return notificationsArray
  }
  const arrayWithRigthUtcDateFormat = notificationsArray.map((notification) => {
    const utcDate = new Date(notification.date)
    return {
      ...notification,
      date: `${utcDate.getDate()}.${utcDate.getMonth() + 1}`
    }
  })

  const objectWithInfoByDays = arrayWithRigthUtcDateFormat.reduce(
    (acc, currentValue) => {
      if (!acc[currentValue.date]) {
        acc[currentValue.date] = {
          add: 0,
          delete: 0,
          edit: 0,
          date: currentValue.date
        }
      }

      switch (currentValue.type) {
        case 'add':
          acc[currentValue.date].add++
          break
        case 'edit':
          acc[currentValue.date].edit++
          break
        case 'delete':
          acc[currentValue.date].delete++
          break
      }

      return acc
    },
    {}
  )

  return Object.values(objectWithInfoByDays as IStatistic)
}

export const getTheBiggestCountNumber = (notifications: IStatistic[]) => {
  if (!Array.isArray(notifications) || !notifications.length) {
    return 0
  }
  const countArray: number[] | [] = notifications.reduce(
    (acc: [] | number[], currentElement) => {
      const countNumbers: number | string[] = Object.values(currentElement)
      countNumbers.forEach((element) => {
        if (typeof element === 'number') {
          acc.push(element)
        }
      })
      return acc
    },
    []
  )

  const maxCount = Math.max(...countArray)
  return maxCount >= 10 ? maxCount : 10
}

export const getDivider = (maxCount: number) => {
  if (isNaN(maxCount) || typeof maxCount !== 'number' || maxCount === 0) {
    return maxCount
  }
  return Math.ceil(maxCount / 5)
}

export class Notification implements INotification {
  type: string
  message: ITodo
  id: number
  hidden: boolean
  date: Date
  constructor(
    type: string,
    message: ITodo,
    id: number,
    hidden: boolean,
    date: Date
  ) {
    this.type = type
    this.message = message
    this.id = id
    this.hidden = hidden
    this.date = date
  }
}
