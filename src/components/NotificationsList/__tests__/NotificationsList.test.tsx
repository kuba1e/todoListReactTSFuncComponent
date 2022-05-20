import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, act, fireEvent } from '@testing-library/react'

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

  it('Show notification list on click', async () => {
    render(
      <Provider store={store}>
        <NotificationsList />
      </Provider>
    )

    expect(screen.getByTestId('notifications')).toBeInTheDocument()

    await act(() => {
      fireEvent.click(screen.getByTestId('notifications'))
    })

    await act(() => {
      expect(screen.getByRole('list')).not.toHaveClass(
        'notifications__list--active'
      )
    })
  })
})
