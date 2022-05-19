import React, { FC } from 'react'

import './Button.scss'

interface ButtonProps {
  onClick: () => void
  className?: string
  type?: 'submit' | 'button'
  children?: React.ReactNode
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className = '',
    children,
    type = 'button',
    onClick,
    ...otherProps
  } = props

  return (
    <button
      data-testid='button'
      className={`button ${className}`}
      {...otherProps}
      type={type}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
    >
      {children}
    </button>
  )
}
