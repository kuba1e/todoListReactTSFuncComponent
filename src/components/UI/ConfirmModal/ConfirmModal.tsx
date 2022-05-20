import React, { FC } from 'react'
import ReactDOM from 'react-dom'

import './ConfirmModal.scss'

import Button from '../Button'

const rootElement = document.createElement('div')
rootElement.id = 'overlay-root'
document.body.append(rootElement)

interface ConfirmModalProps {
  onConfirm(id: number): void
  onDismiss(): void
  children?: React.ReactNode
  id: number
}

const ModalOverlay: FC<ConfirmModalProps> = ({
  children,
  onDismiss,
  onConfirm,
  id
}) => {
  return (
    <div
      className='backdrop'
      onClick={(event) => {
        const target = event.target as HTMLButtonElement
        if (target.classList.contains('backdrop')) {
          onDismiss()
        }
      }}
      data-testid='backdrop'
      aria-hidden='true'
    >
      <div className='modal-overlay'>
        <Button
          className='close-btn'
          onClick={onDismiss}
          data-testid='close-btn'
        />
        <p className='modal-overlay__text'>{children}</p>
        <div className='modal-overlay__control'>
          <Button
            className='confirm-btn'
            onClick={() => onConfirm(id)}
            data-testid='confirm-btn'
          >
            Yes
          </Button>
          <Button
            className='dismiss-btn'
            onClick={onDismiss}
            data-testid='dismiss-btn'
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  onConfirm,
  children,
  onDismiss,
  id
}) => {
  const overlayRoot = document.getElementById('overlay-root')

  if (overlayRoot !== null) {
    const overlayElement = ReactDOM.createPortal(
      <ModalOverlay onConfirm={onConfirm} onDismiss={onDismiss} id={id}>
        {children}
      </ModalOverlay>,
      overlayRoot
    )
    return <>{overlayElement}</>
  }
  return null
}
