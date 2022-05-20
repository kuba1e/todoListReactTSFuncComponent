import React from 'react'
import { render, screen } from '@testing-library/react'
import { Title } from '../Title'

describe('button component', () => {
  it('button render', () => {
    render(<Title>test</Title>)
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('onClick works', () => {
    render(<Title />)
    expect(screen.queryByRole('caption')).toBeNull()
  })
})
