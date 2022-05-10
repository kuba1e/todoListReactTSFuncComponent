import React, { FC } from 'react'

import { Navigate, RouteProps } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'

import { userSelector } from '../../store/selectors'

interface ProtectedRouteProps {
  redirectPath: string
  children?: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps & RouteProps> = ({
  children,
  redirectPath
}) => {
  const { isAuth } = useTypedSelector(userSelector)

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return children ?? null
}
