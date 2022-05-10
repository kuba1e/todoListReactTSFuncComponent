import React, { useCallback, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import './LoginForm.scss'

import { loginUser, resetUserErrors } from '../../store/actions/user'
import { userSelector } from '../../store/selectors'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface FormValues {
  email: string
  password: string
}

export const LoginForm: FC = () => {
  const { isAuth, loginError } = useTypedSelector(userSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    ;() => dispatch(resetUserErrors())
  }, [])

  const handleSubmit = useCallback((values: FormValues) => {
    const { email, password } = values
    dispatch(
      loginUser({
        email,
        password
      })
    )
  }, [])

  const initialValues: FormValues = {
    email: '',
    password: ''
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please, enter the correct email')
      .required('Please enter the email'),
    password: yup
      .string()
      .matches(
        /^([a-zA-Z]+|\d+){6}$/,
        'Please, enter the password longer then 6 symbols'
      )
      .required('Please, enter the password')
  })

  if (isAuth) {
    return <Navigate to='/' replace />
  }

  return (
    <div className='auth'>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({
          values: { email, password },
          errors,
          touched,
          handleChange,
          handleBlur
        }) => (
          <Form className='auth__form'>
            <div className='auth__container'>
              <label className='auth__form-label' htmlFor='email'>
                Email
              </label>
              <input
                className={`auth__form-input ${
                  errors.email && touched.email ? 'auth__form-input--error' : ''
                }`}
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className='auth__form-input-helper'>
                {errors.email && touched.email ? errors.email : ''}
              </p>
            </div>
            <div className='auth__container'>
              <label className='auth__form-label' htmlFor='password'>
                Password
              </label>
              <input
                className={`auth__form-input ${
                  errors.password && touched.password
                    ? 'auth__form-input--error'
                    : ''
                }`}
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
              />
              <p className='auth__form-input-helper'>
                {errors.password && touched.password ? errors.password : ''}
              </p>
            </div>
            <p className='auth__form-input-error'>{loginError || ''}</p>
            <button className='auth__form-sbmt-btn' type='submit'>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
