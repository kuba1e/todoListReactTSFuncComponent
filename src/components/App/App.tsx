import React, { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.scss'

import ProtectedRoute from '../ProtectedRoute'
import ErrorBoundary from '../ErrorBoundary'
import Title from '../UI/Title'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'
import RegisterForm from '../RegisterForm'
import LoginForm from '../LoginForm'
import NotFound from '../NotFound'
import Navigation from '../Navigation'
import HomePage from '../HomePage'
import EditProfilePage from '../EditProfilePage'

export const App: FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/registration' element={<RegisterForm />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute redirectPath='/'>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/todos'
          element={
            <ProtectedRoute redirectPath='/'>
              <ErrorBoundary>
                <div className='todo'>
                  <Title>todos</Title>
                  <div className='todo__inner'>
                    <TodoList />
                    <TodoFooter />
                  </div>
                </div>
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
