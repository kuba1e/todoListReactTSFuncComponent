import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Navigate, RouteProps } from 'react-router-dom'

import { userSelector } from '../../store/selectors'

interface ProtectedRouteProps {
  redirectPath: string
  children?: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps & RouteProps> = ({
  children,
  redirectPath
}) => {
  const { isAuth } = useSelector(userSelector)

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
