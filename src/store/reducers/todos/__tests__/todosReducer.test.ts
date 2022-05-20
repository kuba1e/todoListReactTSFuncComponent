import { todosReducer } from '../todosReducer'
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  failedToDeleteCompletedTodos,
  failedToFetch,
  failedToSendToAddTodo,
  failedToUpdateAllTodo,
  failedToUpdateTodo,
  fetchTodos,
  successfulFetchedTodos,
  toggleAllDoneTodo,
  updateTodos
} from '../../../actions/todos'

describe('todos reducer', () => {
  it('should return initial state', () => {
    const initialState = { todosData: [], loading: 'idle', error: '' }

    expect(todosReducer(undefined, { type: '', payload: '' })).toEqual(
      initialState
    )
  })

  it('should handle adding todo to empty list', () => {
    const previosState = { todosData: [], loading: 'idle', error: '' }
    const nextState = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    expect(
      todosReducer(
        previosState,
        addTodo({
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        })
      )
    ).toEqual(nextState)
  })

  it('should handle  adding todo to not empty list', () => {
    const previosState = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    expect(
      todosReducer(
        previosState,
        addTodo({
          id: 2,
          label: 'test',
          order_num: 2,
          done: false
        })
      )
    ).toEqual({
      todosData: [
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
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    })
  })

  it('should handle deleting todo from list', () => {
    const previosState = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    const nextState = { todosData: [], loading: 'idle', error: '' }

    expect(todosReducer(previosState, deleteTodo(1))).toEqual(nextState)
  })

  it('should handle deleting todo from empty list', () => {
    const previosState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    const nextState = { todosData: [], loading: 'idle', error: '' }

    expect(todosReducer(previosState, deleteTodo(1))).toEqual(nextState)
  })

  it('should handle todo being edited from  list', () => {
    const previosState = {
      todosData: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [
        {
          id: 1,
          label: 'edit',
          order_num: 2,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    expect(
      todosReducer(
        previosState,
        editTodo({
          id: 1,
          label: 'edit',
          order_num: 2,
          done: true
        })
      )
    ).toEqual(nextState)
  })

  it('should handle editing todo from empty list', () => {
    const previosState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    expect(
      todosReducer(
        previosState,
        editTodo({
          id: 1,
          label: 'edit',
          order_num: 2,
          done: true
        })
      )
    ).toEqual(previosState)
  })

  it('should handle updating todo from  list', () => {
    const previosState = {
      todosData: [
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [
        {
          id: 1,
          label: 'edit1',
          order_num: 2,
          done: true
        },
        {
          id: 2,
          label: 'edit2',
          order_num: 34,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    expect(
      todosReducer(
        previosState,
        updateTodos([
          {
            id: 1,
            label: 'edit1',
            order_num: 2,
            done: true
          },
          {
            id: 2,
            label: 'edit2',
            order_num: 34,
            done: false
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('should handle toggle all todos from  list', () => {
    const previosState = {
      todosData: [
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: true
        },
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    expect(todosReducer(previosState, toggleAllDoneTodo(true))).toEqual(
      nextState
    )
  })

  it('should handle toggle all todos from empty list', () => {
    const previosState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    expect(todosReducer(previosState, toggleAllDoneTodo(false))).toEqual(
      nextState
    )
  })

  it('should handle clearing all completed todo from list', () => {
    const previosState = {
      todosData: [
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: true
        },
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: true
        }
      ],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: false
        }
      ],
      loading: 'idle',
      error: ''
    }

    expect(todosReducer(previosState, clearCompleted())).toEqual(nextState)
  })

  it('should handle toggle all todos from empty list', () => {
    const previosState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    expect(todosReducer(previosState, clearCompleted())).toEqual(nextState)
  })

  it('should handle fetching todos', () => {
    const previosState = {
      todosData: [],
      loading: 'idle',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    expect(todosReducer(previosState, fetchTodos())).toEqual(nextState)
  })

  it('should handle fetched todo successful', () => {
    const previosState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      todosData: [
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: true
        },
        {
          id: 2,
          label: 'test2',
          order_num: 3,
          done: true
        }
      ],
      loading: 'succeded',
      error: ''
    }

    expect(
      todosReducer(
        previosState,
        successfulFetchedTodos([
          {
            id: 1,
            label: 'test1',
            order_num: 1,
            done: true
          },
          {
            id: 2,
            label: 'test2',
            order_num: 3,
            done: true
          }
        ])
      )
    ).toEqual(nextState)
  })

  it('should handle fetched todo unsuccessful', () => {
    const previosState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'failed',
      error: '404'
    }

    expect(todosReducer(previosState, failedToFetch('404'))).toEqual(nextState)
  })

  it('should handle updated todo unsuccessful', () => {
    const previosState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'failed',
      error: '404'
    }

    expect(todosReducer(previosState, failedToUpdateTodo('404'))).toEqual(
      nextState
    )
  })

  it('should handle sent  todo unsuccessful', () => {
    const previosState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'failed',
      error: '404'
    }

    expect(todosReducer(previosState, failedToSendToAddTodo('404'))).toEqual(
      nextState
    )
  })

  it('should handle updated all todos unsuccessful', () => {
    const previosState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'failed',
      error: '404'
    }

    expect(todosReducer(previosState, failedToUpdateAllTodo('404'))).toEqual(
      nextState
    )
  })

  it('should handle deleted completed todo unsuccessful', () => {
    const previosState = {
      todosData: [],
      loading: 'pending',
      error: ''
    }

    const nextState = {
      todosData: [],
      loading: 'failed',
      error: '404'
    }

    expect(
      todosReducer(previosState, failedToDeleteCompletedTodos('404'))
    ).toEqual(nextState)
  })
})
