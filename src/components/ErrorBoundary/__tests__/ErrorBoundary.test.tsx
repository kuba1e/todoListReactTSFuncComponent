import React from 'react'
import { render, screen } from '@testing-library/react'

import ErrorBoundary from '../ErrorBoundary'

describe('render error indicator component', () => {
  it('render error indicator with children', () => {
    render(
      <ErrorBoundary>
        <p>test</p>
      </ErrorBoundary>
    )

    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })

  it('render error indicator without children', () => {
    render(<ErrorBoundary></ErrorBoundary>)

    expect(screen.queryByText(/wrong/i)).toBeNull()
  })
})
