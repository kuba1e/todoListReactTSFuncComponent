import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import store from '../../../store'
import { NotificationListItem } from '../NotificationListItem'

describe('render notification list item component', () => {
  it('render notification list item', () => {
    render(
      <Provider store={store}>
        <NotificationListItem
          notification={{
            type: 'add',
            message: {
              id: 1,
              label: 'string',
              done: false,
              order_num: 1
            },
            id: 1,
            hidden: false,
            date: new Date()
          }}
        />
      </Provider>
    )

    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })
})
