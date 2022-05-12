import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from './components/App'
import ErrorBoundary from './components/ErrorBoundary'

import store from './store'

const rootElement = document.getElementById('root')

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </DndProvider>
    </Provider>
  )
}
