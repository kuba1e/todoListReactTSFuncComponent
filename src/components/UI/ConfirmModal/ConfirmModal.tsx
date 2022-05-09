import React, { FC } from 'react'
import ReactDOM from 'react-dom'

import './ConfirmModal.scss'

import Button from '../Button'

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
      aria-hidden='true'
    >
      <div className='modal-overlay'>
        <Button className='close-btn' onClick={onDismiss} />
        <p className='modal-overlay__text'>{children}</p>
        <div className='modal-overlay__control'>
          <Button className='confirm-btn' onClick={() => onConfirm(id)}>
            Yes
          </Button>
          <Button className='dismiss-btn' onClick={onDismiss}>
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
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={onConfirm} onDismiss={onDismiss} id={id}>
          {children}
        </ModalOverlay>,
        document.getElementById('overlay-root')
      )}
    </>
  )
}
