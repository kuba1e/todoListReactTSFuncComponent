import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Navigate, Outlet } from 'react-router-dom'

import { checkAuth } from '../../store/todos'
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
