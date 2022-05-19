import React from 'react'
import { render, screen } from '@testing-library/react'

import { NotFound } from '../NotFound'

describe('render not found component', () => {
  it('render not found', () => {
    render(<NotFound />)
    expect(screen.getByText(/found/i)).toBeInTheDocument()
  })
})
