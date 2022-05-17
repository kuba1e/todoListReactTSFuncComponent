import { INotification, IStatistic, ITodo } from '../types/generalTypes'

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
  const todosCopy = [...todos]
  if (todosCopy !== undefined) {
    return (
      todosCopy
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
  prevElem.order_num - nextElem.order_num

export const findIndex = (array: ITodo[] | INotification[], id: number) => {
  return array.findIndex((arrayElement) => arrayElement.id === id)
}

export const sortArray = (
  todos: ITodo[],
  dragableIndex: number,
  dropableIndex: number | undefined
) => {
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
  const notificationIndex = findIndex(notifications, id)
  return [
    ...notifications.slice(0, notificationIndex),
    { ...notifications[notificationIndex], hidden: true },
    ...notifications.slice(notificationIndex + 1)
  ]
}

export const getShorterText = (label: string, length: number) => {
  const labelLength = label.length
  if (labelLength < length) {
    return label
  }

  return `${label.slice(0, length)}...`
}

export const filterHiddenNotifications = (notifications: Notification[]) => {
  return notifications.filter((notification) => !notification.hidden)
}

export const getCurrentDate = () => {
  const dateNow = new Date()
  return `${dateNow.getDate()}.${dateNow.getMonth() + 1}`
}

export const getArrayForGraphRendering = (
  notificationsArray: INotification[]
) => {
  if (!notificationsArray.length) {
    return []
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
  if (!notifications.length) {
    return 0
  }
  const countArray = notifications.reduce((acc, currentElement) => {
    const countNumbers = Object.values(currentElement)
    countNumbers.forEach((element) => {
      if (typeof element === 'number') {
        acc.push(element)
      }
    })

    return acc
  }, [])

  return Math.max(...countArray)
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
