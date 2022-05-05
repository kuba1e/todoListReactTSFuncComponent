import React from 'react'
import PropTypes from 'prop-types'

import './Title.scss'

export const Title = (props) => {
  const { className = '', children } = props
  return <h4 className={`title ${className}`}>{children}</h4>
}

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
