import React from 'react'
import { Provider } from 'react-redux'
import { act, render, screen } from '@testing-library/react'

import { Graph } from '../Graph'

import store from '../../../store'
import * as api from '../../../store/asyncFoo'

describe('render graph component', () => {
  const fetchNotifications = jest.spyOn(api, 'fetchNotifications')

  fetchNotifications.mockReturnValue(
    Promise.resolve([
      {
        type: 'add',
        message: {
          id: 1,
          label: 'test1',
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
          label: 'test2',
          done: false,
          order_num: 3
        },
        hidden: false,
        date: new Date('2022 02 15'),
        id: 2
      }
    ])
  )

  it('render graph', async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <Graph />
        </Provider>
      )
    })

    await act(() => {
      expect(screen.getByTestId('graph')).toBeInTheDocument()
    })

    await act(() => {
      expect(fetchNotifications).toBeCalledTimes(1)
    })
  })
})
