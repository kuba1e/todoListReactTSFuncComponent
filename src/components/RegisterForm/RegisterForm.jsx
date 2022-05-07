import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { userRegistration, resetUserErrors } from '../../store/actions/user'
import { userSelector } from '../../store/selectors'

export const RegisterForm = () => {
  const { registrError, isRegistered } = useSelector(userSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => () => dispatch(resetUserErrors()), [])

  if (isRegistered) {
    navigate('/login', { replace: true })
  }

  const handleSubmit = useCallback((values) => {
    const { email, password } = values
    dispatch(
      userRegistration({
        email,
        password
      })
    )
  }, [])

  const initialValues = {
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
            <p className='auth__form-input-error'>{registrError || ''}</p>
            <button className='auth__form-sbmt-btn'>Sign up</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
