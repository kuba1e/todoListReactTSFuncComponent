import React, { Fragment } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.scss'

import ProtectedRoute from '../ProtectedRoute'
import ErrorBoundary from '../ErrorBoundary'
import Title from '../UI/Title'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'
import AuthForm from '../AuthForm'
import NotFound from '../NotFound'
import Navigation from '../Navigation'
import HomePage from '../HomePage'
import EditProfilePage from '../EditProfilePage'

import { loginUser, userRegistration } from '../../store/todos'

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
          element={<AuthForm onSubmit={loginUser} btnLabel='Sign in' />}
        />
        <Route
          path='/registration'
          element={<AuthForm onSubmit={userRegistration} btnLabel='Sign up' />}
        />
        <Route path='/profile' element={<EditProfilePage />} />
        <Route element={<ProtectedRoute redirectPath='/' />}>
          <Route
            path='/todos'
            element={
              <ErrorBoundary>
                <div className='todo'>
                  <Title>todos</Title>
                  <div className='todo__inner'>
                    <TodoList />
                    <TodoFooter />
                  </div>
                </div>
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
