import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfirmModal } from '../ConfirmModal'

const onConfirm = jest.fn()
const onDismiss = jest.fn()

describe('render confirm modal component', () => {
  it('confirm modal render', () => {
    const { getByText } = render(
      <ConfirmModal onConfirm={onConfirm} id={2} onDismiss={onDismiss}>
        test
      </ConfirmModal>
    )
    expect(getByText('test')).toBeTruthy()
  })

  it('onClick works', () => {
    render(
      <ConfirmModal onConfirm={onConfirm} id={2} onDismiss={onDismiss}>
        test
      </ConfirmModal>
    )
    expect(screen.getByTestId('close-btn')).toBeInTheDocument()
    expect(screen.getByTestId('confirm-btn')).toBeInTheDocument()
    expect(screen.getByTestId('dismiss-btn')).toBeInTheDocument()
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('close-btn'))
    expect(onDismiss).toBeCalledTimes(1)

    fireEvent.click(screen.getByTestId('confirm-btn'))
    expect(onConfirm).toBeCalledTimes(1)

    fireEvent.click(screen.getByTestId('dismiss-btn'), {})
    expect(onDismiss).toBeCalled()

    fireEvent.click(screen.getByTestId('backdrop'), {})
    expect(onDismiss).toBeCalled()
  })
})
