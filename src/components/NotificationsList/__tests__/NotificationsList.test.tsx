import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import store from '../../../store'
import { NotificationsList } from '../NotificationsList'

describe('render notification list component', () => {
  it('render notification list', () => {
    render(
      <Provider store={store}>
        <NotificationsList />
      </Provider>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
