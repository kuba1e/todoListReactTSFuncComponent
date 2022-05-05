import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Navigate, Outlet } from 'react-router-dom'

import { todosSelector } from '../../store/selectors'

export const ProtectedRoute = ({ children, redirectPath }) => {
  const { isAuth } = useSelector(todosSelector)

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return children || <Outlet />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string
}
