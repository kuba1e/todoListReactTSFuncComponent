import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser, logoutUser, userRegistration } from '../../store/todos'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleEmailChange = useCallback(({ target: { value } }) => {
    setEmail(value)
  }, [])

  const handlePasswordChange = useCallback(({ target: { value } }) => {
    setPassword(value)
  }, [])

  const handleRegistration = () => {
    dispatch(
      userRegistration({
        email,
        password
      })
    )
  }

  const handleLogin = () => {
    dispatch(
      loginUser({
        email,
        password
      })
    )
  }

  const handleLogout = useCallback(() => dispatch(logoutUser()), [])

  return (
    <div className=''>
      <label>
        Email
        <input value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password
        <input
          value={password}
          onChange={handlePasswordChange}
          type='password'
        />
      </label>

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegistration}>Registration</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
