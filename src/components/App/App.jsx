import React from 'react'
import { Provider } from 'react-redux'

import './App.scss'

import ErrorBoundary from '../ErrorBoundary'
import Title from '../UI/Title'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'
import LoginForm from '../LoginForm'

import store from '../../store'

export function App() {
  return (
    <Provider store={store}>
      <Title>todos</Title>
      <LoginForm />
      <ErrorBoundary>
        <div className='todo'>
          <TodoList />
          <TodoFooter />
        </div>
      </ErrorBoundary>
    </Provider>
  )
}
