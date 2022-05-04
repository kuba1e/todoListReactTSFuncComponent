import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser, logoutUser, userRegistration } from '../../features/todos'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  return (
    <div className=''>
      <form
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label>
          Email
          <input
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value)
            }}
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value)
            }}
            type='password'
          />
        </label>

        <button
          onClick={() => {
            dispatch(
              loginUser({
                email,
                password
              })
            )
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            dispatch(
              userRegistration({
                email,
                password
              })
            )
          }}
        >
          Registration
        </button>
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </form>
    </div>
  )
}
