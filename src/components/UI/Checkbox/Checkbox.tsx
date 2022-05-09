import React, { FC } from 'react'

import './Checkbox.scss'

interface CheckboxProps {
  className?: string
  checked: boolean
  onChange: () => void
  children?: React.ReactNode
}

export const Checkbox: FC<CheckboxProps> = ({
  className = '',
  onChange,
  checked,
  children
}) => {
  return (
    <div className={`checkbox ${className}`}>
      <label className='checkbox__label'>
        {children}
        <input
          className='checkbox__input'
          onChange={onChange}
          type='checkbox'
          checked={checked}
        />
        <div className='checkbox__indicator' />
      </label>
    </div>
  )
}
