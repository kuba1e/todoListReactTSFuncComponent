import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

export const renderWithContext = (element: React.ReactElement) => {
  return <Provider store={store}>{element}</Provider>
}

export const renderWithRouter = (element: React.ReactElement) => {
  const history = createMemoryHistory()
  return (
    <Router location={history.location} navigator={history}>
      {element}
    </Router>
  )
}
