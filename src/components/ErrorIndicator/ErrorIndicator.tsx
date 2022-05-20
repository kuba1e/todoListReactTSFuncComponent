import React, { FC } from 'react'

interface ErrorIndicator {
  errorMessage: string
}

export const ErrorIndicator: FC<ErrorIndicator> = ({ errorMessage }) => {
  if (errorMessage === '') {
    return null
  }
  return (
    <div className='error-boundray'>
      <p>Ooops, something went wrong, error: {errorMessage}</p>
    </div>
  )
}
