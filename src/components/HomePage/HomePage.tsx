import React, { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'

import Title from '../UI/Title'

import { checkAuth } from '../../store/actions/user'
import { userSelector } from '../../store/selectors'
import { useSelector } from 'react-redux'

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
