import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { TodoList } from '../TodoList'
import store from '../../../store'
import * as api from '../../../store/asyncFoo'

describe('todo list component', () => {
  beforeEach(() => {
    const fetchTodosFunc = jest.spyOn(api, 'fetchTodosFunc')
    fetchTodosFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: false
        }
      ])
    )
  })

  it('should test render todo list component', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })
  })

  it('should test edit todo list item label', async () => {
    const sendToUpdateTodoFunc = jest.spyOn(api, 'sendToUpdateTodoFunc')

    sendToUpdateTodoFunc.mockReturnValueOnce(
      Promise.resolve({
        data: {
          id: 1,
          label: 'edited',
          order_num: 1,
          done: false
        },
        notification: {
          type: 'edit',
          id: 1,
          message: {
            id: 1,
            label: 'edited',
            order_num: 1,
            done: false
          },
          hidden: false,
          date: new Date('2022-03-05')
        }
      })
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    fireEvent.doubleClick(screen.getByText('test1'))

    await act(() => {
      expect(screen.getByTestId('submit-form')).toBeInTheDocument()
    })

    fireEvent.input(screen.getByTestId('edit-input'), {
      target: {
        value: 'edited'
      }
    })

    fireEvent.submit(screen.getByTestId('submit-form'))

    await act(() => {
      expect(screen.getByText('edited')).toBeInTheDocument()
    })
  })

  it('should test cancel edit todo list item label', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    fireEvent.doubleClick(screen.getByText('test1'))

    await act(() => {
      expect(screen.getByTestId('submit-form')).toBeInTheDocument()
    })

    fireEvent.input(screen.getByTestId('edit-input'), {
      target: {
        value: ''
      }
    })

    fireEvent.blur(screen.getByTestId('edit-input'))

    await act(() => {
      expect(screen.getByText('test1')).toBeInTheDocument()
    })
  })

  it('should test edit todo list item label by edit btn', async () => {
    const sendToUpdateTodoFunc = jest.spyOn(api, 'sendToUpdateTodoFunc')

    sendToUpdateTodoFunc.mockReturnValueOnce(
      Promise.resolve({
        data: {
          id: 1,
          label: 'edited123',
          order_num: 1,
          done: false
        },
        notification: {
          type: 'edit',
          id: 1,
          message: {
            id: 1,
            label: 'edited123',
            order_num: 1,
            done: false
          },
          hidden: false,
          date: new Date('2022-03-05')
        }
      })
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    fireEvent.click(screen.getByTestId('edit-btn-1'))

    await act(() => {
      expect(screen.getByTestId('submit-form')).toBeInTheDocument()
    })

    fireEvent.input(screen.getByTestId('edit-input'), {
      target: {
        value: 'edited123'
      }
    })

    fireEvent.submit(screen.getByTestId('submit-form'))

    await act(() => {
      expect(screen.getByText('edited123')).toBeInTheDocument()
    })
  })

  it('should test edit todo list item checkbox', async () => {
    const sendToUpdateTodoFunc = jest.spyOn(api, 'sendToUpdateTodoFunc')

    sendToUpdateTodoFunc.mockReturnValueOnce(
      Promise.resolve({
        data: {
          id: 1,
          label: 'test123',
          order_num: 1,
          done: true
        },
        notification: {
          type: 'edit',
          id: 1,
          message: {
            id: 1,
            label: 'test1',
            order_num: 1,
            done: true
          },
          hidden: false,
          date: new Date('2022-03-05')
        }
      })
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('checkbox-label-1'))
    })

    await act(() => {
      expect(screen.getByTestId('checkbox-1')).toBeChecked()
    })
  })

  it('should test delete todo list item ', async () => {
    const sendToDeleteTodoFunc = jest.spyOn(api, 'sendToDeleteTodoFunc')

    sendToDeleteTodoFunc.mockReturnValue(
      Promise.resolve({
        data: {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        notification: {
          type: 'delete',
          id: 1,
          message: {
            id: 1,
            label: 'test1',
            order_num: 1,
            done: false
          },
          hidden: false,
          date: new Date('2022-03-05')
        }
      })
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('delete-btn-1'))
    })

    await act(() => {
      expect(screen.getByTestId('backdrop')).toBeInTheDocument()
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('confirm-btn'))
    })

    await act(() => {
      expect(screen.queryByText('test1')).not.toBeInTheDocument()
    })
  })

  it('should test dismiss deleting todo list item ', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('delete-btn-1'))
    })

    await act(() => {
      expect(screen.getByTestId('backdrop')).toBeInTheDocument()
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('dismiss-btn'))
    })

    await act(() => {
      expect(screen.queryByText('test1')).toBeInTheDocument()
    })
  })

  it('should test add todo list item ', async () => {
    const sendToAddTodoFunc = jest.spyOn(api, 'sendToAddTodoFunc')

    sendToAddTodoFunc.mockReturnValue(
      Promise.resolve({
        data: {
          id: 3,
          label: 'new todo',
          order_num: 3,
          done: false
        },
        notification: {
          type: 'add',
          id: 1,
          message: {
            id: 3,
            label: 'new todo',
            order_num: 3,
            done: false
          },
          hidden: false,
          date: new Date('2022-03-05')
        }
      })
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      expect(screen.getByTestId('add-form')).toBeInTheDocument()
    })

    await act(() => {
      fireEvent.input(screen.getByTestId('add-form-input'), {
        target: {
          value: 'new todo'
        }
      })

      fireEvent.blur(screen.getByTestId('add-form-input'))
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(3)
      expect(screen.getByText('new todo')).toBeInTheDocument()
    })
  })

  it('should test toggle all todo list item ', async () => {
    const sendToUpdateAllTodoFunc = jest.spyOn(api, 'sendToUpdateAllTodoFunc')

    sendToUpdateAllTodoFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 3,
          done: true
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: true
        }
      ])
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      expect(screen.getByTestId('toggle-all')).toBeInTheDocument()
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('toggle-all'))
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
      screen.getAllByRole('checkbox').forEach((checkbox) => {
        expect(checkbox).toBeChecked()
      })
    })
  })

  it('should test classname on select all btn if all checked', async () => {
    const fetchTodosFunc = jest.spyOn(api, 'fetchTodosFunc')
    fetchTodosFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: true
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: true
        }
      ])
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      expect(screen.getByTestId('toggle-all')).toHaveClass(
        'select-all-btn--selected'
      )
    })
  })

  it('should test clear completed todos', async () => {
    const fetchTodosFunc = jest.spyOn(api, 'fetchTodosFunc')
    fetchTodosFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: false
        }
      ])
    )

    const sendToUpdateAllTodoFunc = jest.spyOn(api, 'sendToUpdateAllTodoFunc')

    sendToUpdateAllTodoFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 3,
          done: true
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: true
        }
      ])
    )

    const sendToDeleteCompletedTodoFunc = jest.spyOn(
      api,
      'sendToDeleteCompletedTodoFunc'
    )
    sendToDeleteCompletedTodoFunc.mockReturnValue(Promise.resolve())

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('toggle-all'))
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('clear-completed'))
    })

    screen.debug()

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    })
  })

  it('should test filter todo list', async () => {
    const fetchTodosFunc = jest.spyOn(api, 'fetchTodosFunc')
    fetchTodosFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: true
        }
      ])
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('filter-btn-all'))
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('filter-btn-completed'))
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(1)
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('filter-btn-active'))
    })

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(1)
    })
  })

  it('should test drag and drop list item', async () => {
    const fetchTodosFunc = jest.spyOn(api, 'fetchTodosFunc')
    fetchTodosFunc.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: false
        }
      ])
    )

    const sendToUpdateAllTodoFunc = jest.spyOn(api, 'sendToUpdateAllTodoFunc')

    sendToUpdateAllTodoFunc.mockReturnValueOnce(
      Promise.resolve([
        {
          id: 1,
          label: 'test1',
          order_num: 3,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: false
        }
      ])
    )

    await act(() => {
      render(
        <Provider store={store}>
          <TodoList />
        </Provider>
      )
    })

    screen.debug()

    await act(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    await act(() => {
      fireEvent.drag(screen.getByTestId('listitem-1'))
    })

    await act(() => {
      fireEvent.drop(screen.getByTestId('listitem-2'))
    })

    await act(() => {
      expect(store.getState().todos.todosData.todosData).toEqual([
        {
          id: 1,
          label: 'test1',
          order_num: 3,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: false
        }
      ])
    })
  })
})
