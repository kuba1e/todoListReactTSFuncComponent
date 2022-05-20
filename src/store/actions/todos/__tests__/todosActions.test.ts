import { faker } from '@faker-js/faker'
import { FilterValueActionType } from '../../../../types/filterValue'

import { ITodo } from '../../../../types/generalTypes'
import { TodosActionType } from '../../../../types/todos'
import {
  addTodo,
  deleteTodo,
  editTodo,
  failedToFetch,
  failedToSendToAddTodo,
  failedToUpdateTodo,
  fetchTodos,
  sendToAddTodo,
  sendToUpdateTodo,
  setFilterValue,
  successfulFetchedTodos,
  toggleAllDoneTodo,
  sendToUpdateAllTodo,
  failedToUpdateAllTodo,
  sendToDeleteTodo,
  failedToDeleteTodo,
  sendToDeleteCompletedTodos,
  failedToDeleteCompletedTodos,
  updateTodos
} from '../todosActions'

describe('test todos actions', () => {
  it('should test add todo action', () => {
    const todo: ITodo = {
      id: faker.mersenne.rand(),
      label: faker.random.words(),
      done: false,
      order_num: faker.mersenne.rand()
    }

    const actionReturnValue = addTodo(todo)

    expect(actionReturnValue.type).toEqual(TodosActionType.ACTION_ADD_TO_DO)
    expect(actionReturnValue.payload).toEqual(todo)
  })

  it('should test delete todo action', () => {
    const id = faker.mersenne.rand()

    const actionReturnValue = deleteTodo(id)

    expect(actionReturnValue.type).toEqual(TodosActionType.ACTION_DELETE_TO_DO)
    expect(actionReturnValue.payload).toEqual(id)
  })

  it('should test toggle all todo action', () => {
    const status = false

    const actionReturnValue = toggleAllDoneTodo(status)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO
    )
    expect(actionReturnValue.payload).toEqual(status)
  })

  it('should test clear completed todos action', () => {
    const status = false

    const actionReturnValue = toggleAllDoneTodo(status)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_TOGGLE_DONE_ALL_TO_DO
    )
  })

  it('should test set  filter value action', () => {
    const filterValue = faker.random.word()

    const actionReturnValue = setFilterValue(filterValue)

    expect(actionReturnValue.type).toEqual(
      FilterValueActionType.ACTION_SET_FILTER_VALUE
    )
    expect(actionReturnValue.payload).toEqual(filterValue)
  })

  it('should test edit todo action', () => {
    const todo: ITodo = {
      id: faker.mersenne.rand(),
      label: faker.random.words(),
      done: false,
      order_num: faker.mersenne.rand()
    }

    const actionReturnValue = editTodo(todo)

    expect(actionReturnValue.type).toEqual(TodosActionType.ACTION_EDIT_TO_DO)
    expect(actionReturnValue.payload).toEqual(todo)
  })

  it('should test fetch todos action', () => {
    const actionReturnValue = fetchTodos()

    expect(actionReturnValue.type).toEqual(TodosActionType.ACTION_FETCH_TODOS)
  })

  it('should test successful fetched todos action', () => {
    const todos = []
    for (let i = 0; i <= 20; i++) {
      const todo: ITodo = {
        id: faker.mersenne.rand(),
        label: faker.random.words(),
        done: false,
        order_num: faker.mersenne.rand()
      }
      todos.push(todo)
    }

    const actionReturnValue = successfulFetchedTodos(todos)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_SUCCESSFUL_FETCHED_TODOS
    )
    expect(actionReturnValue.payload).toEqual(todos)
  })

  it('should test failed to fetch todos action', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToFetch(error)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_FAILED_TO_FETCH_TODOS
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test send to add todo action', () => {
    const label = faker.random.words()

    const actionReturnValue = sendToAddTodo(label)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_SEND_TO_ADD_TODO
    )
    expect(actionReturnValue.payload).toEqual(label)
  })

  it('should test failed to send to add todo action', () => {
    const error = faker.random.words()

    const actionReturnValue = failedToSendToAddTodo(error)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_FAILED_TO_SEND_TO_ADD_TODO
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test  send to update todo action', () => {
    const todo: ITodo = {
      id: faker.mersenne.rand(),
      label: faker.random.words(),
      done: false,
      order_num: faker.mersenne.rand()
    }
    const actionReturnValue = sendToUpdateTodo(todo)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_SEND_TO_UPDATE_TODO
    )
    expect(actionReturnValue.payload).toEqual(todo)
  })

  it('should test  failed to update todo action', () => {
    const error = faker.random.words()

    const actionReturnValue = failedToUpdateTodo(error)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_FAILED_TO_UPDATE_TODO
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test  send to update all todo action', () => {
    const actionReturnValue = sendToUpdateAllTodo()

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_SEND_TO_UPDATED_ALL_TODO
    )
  })

  it('should test  failed to update all todo action', () => {
    const error = faker.random.words()

    const actionReturnValue = failedToUpdateAllTodo(error)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_FAILED_TO_UPDATE_ALL_TODO
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test  send to delete todo action', () => {
    const id = faker.mersenne.rand()

    const actionReturnValue = sendToDeleteTodo(id)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_SEND_TO_DELETE_TODO
    )
    expect(actionReturnValue.payload).toEqual(id)
  })

  it('should test  failed to send to delete todo action', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToDeleteTodo(error)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_FAILED_TO_DELETE_TODO
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test  send to delete completed todos action', () => {
    const todos = []
    for (let i = 0; i <= 20; i++) {
      const todo: ITodo = {
        id: faker.mersenne.rand(),
        label: faker.random.words(),
        done: false,
        order_num: faker.mersenne.rand()
      }
      todos.push(todo)
    }
    const actionReturnValue = sendToDeleteCompletedTodos(todos)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_SEND_TO_DELETE_COMPLETED_TODOS
    )
    expect(actionReturnValue.payload).toEqual(todos)
  })

  it('should test  failed send to delete completed todos action', () => {
    const error = faker.random.word()

    const actionReturnValue = failedToDeleteCompletedTodos(error)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_FAILED_TO_DELETE_COMPLETED_TODOS
    )
    expect(actionReturnValue.payload).toEqual(error)
  })

  it('should test  update todos action', () => {
    const todos = []
    for (let i = 0; i <= 20; i++) {
      const todo: ITodo = {
        id: faker.mersenne.rand(),
        label: faker.random.words(),
        done: false,
        order_num: faker.mersenne.rand()
      }
      todos.push(todo)
    }
    const actionReturnValue = updateTodos(todos)

    expect(actionReturnValue.type).toEqual(
      TodosActionType.ACTION_UPDATE_ALL_TO_DO
    )
    expect(actionReturnValue.payload).toEqual(todos)
  })
})
