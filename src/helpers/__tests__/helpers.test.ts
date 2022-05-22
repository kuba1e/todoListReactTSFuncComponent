import { INotification, IStatistic, ITodo } from 'types/generalTypes'
import {
  getCompletedQuantity,
  areAllCompleted,
  getTodoCount,
  getFilteredTodosList,
  generateValue,
  createTodo,
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  editTodo,
  isObjectEmpty,
  getResponseStatus,
  sortHandler,
  findIndex,
  sortArray,
  deleteNotification,
  getShorterText,
  filterHiddenNotifications,
  getArrayForGraphRendering,
  getTheBiggestCountNumber,
  getDivider
} from '../helpers'

describe('test helper functions', () => {
  it('should test getCompletedQuantity function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ]

    expect(getCompletedQuantity(todos)).toEqual(1)
    expect(getCompletedQuantity([])).toEqual(0)
    expect(getCompletedQuantity({} as ITodo[])).toEqual(-1)
  })

  it('should test areAllCompleted function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ]

    const completedTodos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: true
      },
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ]

    expect(areAllCompleted(todos)).toEqual(false)
    expect(areAllCompleted(completedTodos)).toEqual(true)
    expect(areAllCompleted([])).toEqual(false)
    expect(areAllCompleted({} as ITodo[])).toEqual(false)
  })

  it('should test getTodoCount function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ]

    expect(getTodoCount(todos)).toEqual(1)
    expect(getCompletedQuantity([])).toEqual(0)
    expect(getCompletedQuantity({} as ITodo[])).toEqual(-1)
  })

  it('should test getFilteredTodoList function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ]

    expect(getFilteredTodosList('all', todos)).toEqual(todos)
    expect(getFilteredTodosList('completed', todos)).toEqual([
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ])
    expect(getFilteredTodosList('active', todos)).toEqual([
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      }
    ])
    expect(getFilteredTodosList('sdfsdf', todos)).toEqual(todos)
    expect(getFilteredTodosList({} as string, {} as ITodo[])).toEqual({})
  })

  it('should test generateValue function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    expect(generateValue(todos, 'id')).toEqual(3)
    expect(generateValue(todos, 'order_num')).toEqual(6)
    expect(generateValue({} as ITodo[], {} as string)).toEqual(0)
    expect(generateValue(todos, 'label')).toEqual(0)
  })

  it('should test createTodo function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    expect(createTodo('test123', todos)).toEqual({
      id: 3,
      label: 'test123',
      order_num: 6,
      done: false
    })
    expect(createTodo({} as string, todos)).toEqual({})
  })

  it('should test getCompletedQuantity function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ]

    expect(deleteTodo(1, todos)).toEqual([
      {
        id: 2,
        label: 'test',
        order_num: 2,
        done: true
      }
    ])
    expect(deleteTodo(0, todos)).toEqual(todos)
    expect(deleteTodo(0, [])).toEqual([])
    expect(deleteTodo(-1, {} as ITodo[])).toEqual({})
  })

  it('should test toggleAllDoneTodo function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    expect(toggleAllDoneTodo(true, todos)).toEqual([
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: true
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ])

    expect(toggleAllDoneTodo(false, todos)).toEqual([
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: false
      }
    ])
    expect(toggleAllDoneTodo({} as boolean, todos)).toEqual(todos)
    expect(toggleAllDoneTodo({} as boolean, {} as ITodo[])).toEqual({})
  })

  it('should test clearCompletedTodo function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    expect(clearCompletedTodo(todos)).toEqual([
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      }
    ])

    expect(clearCompletedTodo({} as ITodo[])).toEqual({})
  })

  it('should test editTodo function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    expect(
      editTodo(
        {
          id: 1,
          label: 'edit',
          order_num: 55,
          done: true
        },
        todos
      )
    ).toEqual([
      {
        id: 1,
        label: 'edit',
        order_num: 55,
        done: true
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ])
    expect(editTodo({} as ITodo, todos)).toEqual(todos)

    expect(editTodo({} as ITodo, {} as ITodo[])).toEqual({})
  })

  it('should test isObjectEmpty function', () => {
    const objetToTest = {
      id: 1,
      label: 'test',
      order_num: 1,
      done: false
    }

    expect(isObjectEmpty(objetToTest)).toEqual(false)
    expect(isObjectEmpty({})).toEqual(true)
    expect(isObjectEmpty([])).toEqual(true)
    expect(isObjectEmpty(null)).toEqual(false)
    expect(isObjectEmpty(3)).toEqual(false)
  })

  it('should test getResponseStatus function', () => {
    expect(getResponseStatus(400)).toEqual(4)
    expect(() => {
      getResponseStatus(NaN)
    }).toThrow()

    expect(() => {
      getResponseStatus({} as number)
    }).toThrow()
  })

  it('should test sortHandler function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 6,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    const wrongTodosArray = [
      {
        id: 2,
        label: 'test',
        done: true
      },
      {
        id: 1,
        label: 'test',
        done: false
      }
    ] as ITodo[]

    expect(todos.sort(sortHandler)).toEqual([
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      },
      {
        id: 1,
        label: 'test',
        order_num: 6,
        done: false
      }
    ])

    expect([].sort(sortHandler)).toEqual([])

    expect(wrongTodosArray.sort(sortHandler)).toEqual([
      {
        id: 2,
        label: 'test',
        done: true
      },
      {
        id: 1,
        label: 'test',
        done: false
      }
    ])
  })

  it('should test findIndex function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 6,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    const notifications = [
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2022 02 14'),
        id: 1
      },
      {
        type: 'edit',
        message: {
          id: 1,
          label: 'edit',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2033 02 14'),
        id: 2
      }
    ]

    expect(findIndex(todos, 2)).toEqual(1)
    expect(findIndex(notifications, 2)).toEqual(1)
    expect(findIndex({} as ITodo[], 1)).toEqual(-1)
    expect(findIndex({} as ITodo[], {} as number)).toEqual(-1)
  })

  it('should test sortArray function', () => {
    const todos = [
      {
        id: 1,
        label: 'test',
        order_num: 6,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ]

    expect(sortArray(JSON.parse(JSON.stringify(todos)), 0, 1)).toEqual([
      {
        id: 1,
        label: 'test',
        order_num: 5,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 6,
        done: true
      }
    ])

    expect(sortArray(JSON.parse(JSON.stringify(todos)), 0, 0)).toEqual([
      {
        id: 1,
        label: 'test',
        order_num: 6,
        done: false
      },
      {
        id: 2,
        label: 'test',
        order_num: 5,
        done: true
      }
    ])

    expect(sortArray({} as ITodo[], 0, undefined)).toEqual({})
  })

  it('should test deleteNotification function', () => {
    const notifications = [
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2022 02 14'),
        id: 1
      },
      {
        type: 'edit',
        message: {
          id: 1,
          label: 'edit',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2033 02 14'),
        id: 2
      }
    ]

    expect(deleteNotification(notifications, 2)).toEqual([
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2022 02 14'),
        id: 1
      },
      {
        type: 'edit',
        message: {
          id: 1,
          label: 'edit',
          done: false,
          order_num: 2
        },
        hidden: true,
        date: new Date('2033 02 14'),
        id: 2
      }
    ])

    expect(deleteNotification([], 1)).toEqual([])
    expect(deleteNotification([], NaN)).toEqual([])
    expect(deleteNotification({} as INotification[], NaN)).toEqual({})
    expect(deleteNotification({} as INotification[], {} as number)).toEqual({})
  })

  it('should test getShorterText function', () => {
    expect(getShorterText('test', 2)).toEqual('te...')
    expect(getShorterText('test', 5)).toEqual('test')
    expect(getShorterText({} as string, 5)).toEqual({})
    expect(getShorterText({} as string, {} as number)).toEqual({})
  })

  it('should test filterHiddenNotifications function', () => {
    const notifications = [
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2022 02 14'),
        id: 1
      },
      {
        type: 'edit',
        message: {
          id: 1,
          label: 'edit',
          done: false,
          order_num: 2
        },
        hidden: true,
        date: new Date('2033 02 14'),
        id: 2
      }
    ]

    expect(filterHiddenNotifications(notifications)).toEqual([
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2022 02 14'),
        id: 1
      }
    ])

    expect(filterHiddenNotifications({} as INotification[])).toEqual({})
    expect(filterHiddenNotifications([])).toEqual([])
  })

  it('should test getArrayForGraphRendering function', () => {
    const notifications = [
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2022 02 14'),
        id: 1
      },
      {
        type: 'edit',
        message: {
          id: 1,
          label: 'edit',
          done: false,
          order_num: 2
        },
        hidden: false,
        date: new Date('2033 02 14'),
        id: 2
      }
    ]

    expect(getArrayForGraphRendering(notifications)).toEqual([
      {
        add: 1,
        delete: 0,
        edit: 1,
        date: '14.2'
      }
    ])

    expect(getArrayForGraphRendering([])).toEqual([])
    expect(getArrayForGraphRendering({} as INotification[])).toEqual({})
  })

  it('should test getTheBiggestCountNumber function', () => {
    const notifications = [
      {
        add: 1,
        delete: 10,
        edit: 1,
        date: '14.2'
      },
      {
        add: 1,
        delete: 0,
        edit: 100,
        date: '15.2'
      }
    ]

    expect(getTheBiggestCountNumber(notifications)).toEqual(100)
    expect(getTheBiggestCountNumber([])).toEqual(0)
    expect(getTheBiggestCountNumber({} as IStatistic[])).toEqual(0)
  })

  it('should test getTheBiggestCountNumber function', () => {
    expect(getDivider(50)).toEqual(50 / 5)
    expect(getDivider(0)).toEqual(0)
    expect(getDivider(NaN)).toEqual(NaN)
  })
})
