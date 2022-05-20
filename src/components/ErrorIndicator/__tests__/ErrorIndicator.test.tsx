import React from 'react'
import { render, screen } from '@testing-library/react'

import { ErrorIndicator } from '../ErrorIndicator'

describe('render error indicator component', () => {
  it('render error indicator with message', () => {
    render(<ErrorIndicator errorMessage={'error-message'} />)

    expect(screen.getByText(/error-message/i)).toBeInTheDocument()
  })

  it('render error indicator without message', () => {
    render(<ErrorIndicator errorMessage={''} />)

    expect(screen.queryByText(/wrong/i)).toBeNull()
  })
})
