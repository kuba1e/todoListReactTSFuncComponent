import React, { FC } from 'react'

import './Title.scss'

interface TitleProps {
  className?: string
  children?: React.ReactNode
}

export const Title: FC<TitleProps> = (props) => {
  const { className = '', children } = props
  return <h4 className={`title ${className}`}>{children}</h4>
}
