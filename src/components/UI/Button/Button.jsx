import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

export const Button = (props) => {
  const {
    onClick = () => {},
    className = '',
    children,
    type = 'button'
  } = props

  return (
    <button className={`button ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string
}
