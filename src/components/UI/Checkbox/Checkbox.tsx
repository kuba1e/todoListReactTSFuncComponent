import React, { FC } from 'react'

import './Checkbox.scss'

interface CheckboxProps {
  className?: string
  checked: boolean
  onChange: () => void
  children?: React.ReactNode
  inputTestId: string
  labelTestId: string
}

export const Checkbox: FC<CheckboxProps> = ({
  className = '',
  onChange,
  checked,
  children,
  labelTestId,
  inputTestId
}) => {
  return (
    <div className={`checkbox ${className}`}>
      <label className='checkbox__label' data-testid={labelTestId}>
        {children}
        <input
          className='checkbox__input'
          onChange={onChange}
          type='checkbox'
          name='checkbox'
          checked={checked}
          data-testid={inputTestId}
        />
        <div className='checkbox__indicator' />
      </label>
    </div>
  )
}
