import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

const onClick = jest.fn()

describe('button component', () => {
  it('button render', () => {
    render(<Button onClick={onClick} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('onClick works', () => {
    render(<Button onClick={onClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toBeCalledTimes(1)
  })
})
