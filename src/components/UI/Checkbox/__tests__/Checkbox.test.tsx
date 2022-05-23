import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../Checkbox'

const onChange = jest.fn()

describe('button component', () => {
  it('button render', () => {
    render(
      <Checkbox
        onChange={onChange}
        checked={true}
        labelTestId='checkbox-label'
        inputTestId='checkbox'
      >
        test
      </Checkbox>
    )
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox')).toBeChecked()
  })

  it('onClick works', () => {
    render(
      <Checkbox
        onChange={onChange}
        checked={true}
        labelTestId='checkbox-label'
        inputTestId='checkbox'
      />
    )

    fireEvent.click(screen.getByTestId('checkbox-label'))
    expect(onChange).toBeCalledTimes(1)
  })
})
