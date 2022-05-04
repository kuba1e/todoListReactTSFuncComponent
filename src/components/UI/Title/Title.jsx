import React from 'react'
import PropTypes from 'prop-types'

import './Title.scss'

export const Title = (props) => {
  const { className = '', children } = props
  return <h1 className={`title ${className}`}>{children}</h1>
}

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
