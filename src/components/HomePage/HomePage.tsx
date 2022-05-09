import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Title from '../UI/Title'

import { checkAuth } from '../../store/actions/user'
import { userSelector } from '../../store/selectors'

export const HomePage: FC = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(userSelector)
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
