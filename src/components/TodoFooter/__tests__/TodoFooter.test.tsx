import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from '../../../store'
import { TodoFooter } from '../TodoFooter'

describe('render todo footer component', () => {
  it('render todo footer', () => {
    render(
      <Provider store={store}>
        <TodoFooter />
      </Provider>
    )

    expect(screen.getByText(/all/i)).toBeInTheDocument()
  })
})
