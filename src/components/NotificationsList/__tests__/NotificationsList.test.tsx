import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, act, fireEvent } from '@testing-library/react'

import { NotificationsList } from '../NotificationsList'

import store from '../../../store'
import * as api from '../../../store/asyncFoo'
import { getNotifications } from '../../../store/actions/user'

describe('render notification list component', () => {
  beforeAll(() => {
    store.dispatch(
      getNotifications([
        {
          type: 'add',
          message: {
            id: 1,
            label: 'test',
            done: false,
            order_num: 2
          },
          hidden: false,
          date: new Date('2022 02 14'),
          id: 1
        },
        {
          type: 'delete',
          message: {
            id: 2,
            label: 'test',
            done: false,
            order_num: 3
          },
          hidden: false,
          date: new Date('2022 02 14'),
          id: 2
        }
      ])
    )
  })

  it('render notification list', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <NotificationsList />
        </Provider>
      )
    })

    expect(screen.getByRole('list')).toBeInTheDocument()
    await act(() => {
      expect(screen.getByRole('list')).not.toHaveClass(
        'notifications__list--active'
      )
    })
  })

  it('Show notification list on click', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <NotificationsList />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.getByTestId('notifications')).toBeInTheDocument()
    })

    await act(() => {
      fireEvent.click(screen.getByTestId('notifications'))
    })

    await act(() => {
      expect(screen.getByRole('list')).toHaveClass(
        'notifications__list--active'
      )

      expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })
  })

  it('should delete notification list item on click', async () => {
    const sendToDeleteNotificationFunc = jest.spyOn(
      api,
      'sendToDeleteNotificationFunc'
    )

    sendToDeleteNotificationFunc.mockReturnValue(Promise.resolve())

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
      expect(screen.getByRole('list')).toHaveClass(
        'notifications__list--active'
      )
    })
    await act(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })

    screen.debug()

    await act(() => {
      fireEvent.click(screen.getByTestId('notific-delete-btn-2'))
    })

    await act(() => {
      expect(screen.getByTestId('notific-list-item-2')).toHaveClass(
        'notifications__list-item--deleting'
      )
    })
  })
})
