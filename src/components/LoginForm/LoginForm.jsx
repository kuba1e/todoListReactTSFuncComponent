import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser, logoutUser, userRegistration } from '../../features/todos'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const hadnleEmailChange = useCallback(({ target: { value } }) => {
    setEmail(value)
  }, [])

  const handlePasswordChange = useCallback(({ target: { value } }) => {
    setPassword(value)
  }, [])

  const handleRegistration = useCallback(() => {
    dispatch(
      userRegistration({
        email,
        password
      })
    )
  }, [])

  const handleLogin = useCallback(() => {
    dispatch(
      loginUser({
        email,
        password
      })
    )
  }, [])

  const handleLogout = useCallback(() => dispatch(logoutUser()), [])

  return (
    <div className=''>
      <label>
        Email
        <input value={email} onChange={hadnleEmailChange} />
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
