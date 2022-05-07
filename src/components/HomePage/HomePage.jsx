import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Title from '../UI/Title'

import { checkAuth } from '../../store/actions/user'
import { todosSelector } from '../../store/selectors'

export const HomePage = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(todosSelector)
  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      dispatch(checkAuth())
    }
  }, [])

  return (
    <div>
      <Title>todos</Title>
    </div>
  )
}
