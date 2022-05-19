import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import store from '../../../store'
import { TodoAddForm } from '../TodoAddForm'

describe('render todo add form component', () => {
  it('render todo add form', () => {
    render(
      <Provider store={store}>
        <TodoAddForm />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/done/i)).toBeInTheDocument()
  })
})
