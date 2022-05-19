import React from 'react'
import { render, screen } from '@testing-library/react'

import { Loader } from '../Loader'

describe('render loader component', () => {
  it('render loader', () => {
    render(<Loader />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})
