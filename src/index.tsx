import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import ErrorBoundary from './components/ErrorBoundary'

import store from './store'

const rootElement = document.getElementById('root')

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </Provider>
  )
}
