import React, { useCallback, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './Navigation.scss'

import Button from '../UI/Button'
import Notification from '../NotificationsList'

import { userSelector } from '../../store/selectors'
import { logoutUser } from '../../store/actions/user'
import { useSelector } from 'react-redux'

export const Navigation: FC = () => {
  const dispatch = useDispatch()
  const { isAuth, userData } = useSelector(userSelector)
  const { email } = userData ?? {}

  const handleLogoutUser = useCallback(() => {
    dispatch(logoutUser())
  }, [])

  const unauthorizedUser = !isAuth ? (
    <>
      <li className='header__nav-list-item'>
        <Link to='/login'>Login</Link>
      </li>
      <li className='header__nav-list-item'>
        <Link to='/registration'>Registration</Link>
      </li>
    </>
  ) : null

  const authorizedUser = isAuth ? (
    <>
      <li className='header__nav-list-item'>
        <Link to='/profile'>{email}</Link>
      </li>
      <li className='header__nav-list-item'>
        <Link to='/todos'>My Todos</Link>
      </li>
      <li className='header__nav-list-item'>
        <Link to='/graph'>Graph</Link>
      </li>
      <li className='header__nav-list-item'>
        <Button onClick={handleLogoutUser} className='logout'>
          Logout
        </Button>
      </li>
      <li className='header__nav-list-item'>
        <Notification />
      </li>
    </>
  ) : null

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/' data-testid='home-route'>
          <h5 className='header__logo-title'>Home</h5>
        </Link>
      </div>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          {unauthorizedUser}
          {authorizedUser}
        </ul>
      </nav>
    </header>
  )
}
