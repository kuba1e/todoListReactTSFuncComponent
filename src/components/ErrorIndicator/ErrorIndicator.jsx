import React from 'react'
import PropTypes from 'prop-types'

export const ErrorIndicator = ({ errorMessage }) => {
  return (
    <div className='error-boundray'>
      <p>Ooops, something went wrong, error: {errorMessage}</p>
    </div>
  )
}

ErrorIndicator.propTypes = {
  errorMessage: PropTypes.string
}
