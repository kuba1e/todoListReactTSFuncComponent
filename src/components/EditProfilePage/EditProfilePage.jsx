import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { userSelector } from '../../store/selectors'
import { updateUser } from '../../store/actions/user'

export const EditProfilePage = (props) => {
  const dispatch = useDispatch()
  const {
    error,
    userData: { id, email }
  } = useSelector(userSelector)

  const handleSubmit = useCallback(
    ({ email, newPassword, oldPassword }, { resetForm }) => {
      dispatch(
        updateUser({
          email,
          ...(newPassword ? { newPassword } : {}),
          oldPassword,
          id
        })
      )
      resetForm({
        values: {
          email: '',
          newPassword: '',
          newPasswordConfirm: '',
          oldPassword: ''
        }
      })
    },
    []
  )

  const initialValues = {
    email,
    newPassword: '',
    newPasswordConfirm: '',
    oldPassword: ''
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please, enter the correct email')
      .required('Please enter the email'),
    oldPassword: yup
      .string()
      .matches(
        /^([a-zA-Z]+|\d+){6}$/,
        'Please, enter the password longer then 6 symbols'
      )
      .required('Please, enter the password'),
    newPassword: yup
      .string()
      .matches(
        /^([a-zA-Z]+|\d+){6}$/,
        'Please, enter the password longer then 6 symbols'
      ),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Password must match')
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
          values: { email, oldPassword, newPassword, newPasswordConfirm },
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
              <label className='auth__form-label' htmlFor='oldPassword'>
                Current password
              </label>
              <input
                className={`auth__form-input ${
                  errors.oldPassword && touched.oldPassword
                    ? 'auth__form-input--error'
                    : ''
                }`}
                name='oldPassword'
                value={oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
              />
              <p className='auth__form-input-helper'>
                {errors.oldPassword && touched.oldPassword
                  ? errors.oldPassword
                  : ''}
              </p>
            </div>
            <div className='auth__container'>
              <label className='auth__form-label' htmlFor='newPassword'>
                New password
              </label>
              <input
                className={`auth__form-input ${
                  errors.newPassword && touched.newPassword
                    ? 'auth__form-input--error'
                    : ''
                }`}
                name='newPassword'
                value={newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
              />
              <p className='auth__form-input-helper'>
                {errors.newPassword && touched.newPassword
                  ? errors.newPassword
                  : ''}
              </p>
            </div>
            <div className='auth__container'>
              <label className='auth__form-label' htmlFor='newPasswordConfirm'>
                Confirm password
              </label>
              <input
                className={`auth__form-input ${
                  errors.newPasswordConfirm && touched.newPasswordConfirm
                    ? 'auth__form-input--error'
                    : ''
                }`}
                name='newPasswordConfirm'
                value={newPasswordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
              />
              <p className='auth__form-input-helper'>
                {errors.newPasswordConfirm && touched.newPasswordConfirm
                  ? errors.newPasswordConfirm
                  : ''}
                {error ? 'Password or email is wrong' : ''}
              </p>
            </div>
            <button className='auth__form-sbmt-btn'>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
