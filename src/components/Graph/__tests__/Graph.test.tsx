import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import store from '../../../store'
import { Graph } from '../Graph'

describe('render graph component', () => {
  it('render graph', () => {
    render(
      <Provider store={store}>
        <Graph />
      </Provider>
    )

    expect(screen.getByTestId('graph')).toBeInTheDocument()
  })
})
