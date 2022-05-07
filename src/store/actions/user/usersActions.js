export const ACTION_LOGIN_USER = 'ACTION_LOGIN_USER'
export const loginUser = (data) => ({
  type: ACTION_LOGIN_USER,
  payload: data
})

export const ACTION_FAILED_TO_LOGIN_USER = 'ACTION_FAILED_TO_LOGIN_USER'
export const failedToLoginUser = (error) => ({
  type: ACTION_FAILED_TO_LOGIN_USER,
  payload: error
})

export const ACTION_LOGOUT_USER = 'ACTION_LOGOUT_USER'
export const logoutUser = () => ({
  type: ACTION_LOGOUT_USER
})

export const ACTION_FAILED_TO_LOGOUT_USER = 'ACTION_FAILED_TO_LOGOUT_USER'
export const failedToLogoutUser = (error) => ({
  type: ACTION_FAILED_TO_LOGOUT_USER,
  payload: error
})

export const ACTION_USER_REGISTRATION = 'ACTION_REQUESTED_TO_USER_REGISTRATION'
export const userRegistration = (data) => ({
  type: ACTION_USER_REGISTRATION,
  payload: data
})

export const ACTION_FAILED_TO_REGISTER_USER = 'ACTION_FAILED_TO_REGISTER_USER'
export const failedToRegisterUser = (error) => ({
  type: ACTION_FAILED_TO_REGISTER_USER,
  payload: error
})

export const ACTION_UPDATE_USER = 'ACTION_UPDATE_USER'
export const updateUser = (data) => ({
  type: ACTION_UPDATE_USER,
  payload: data
})

export const ACTION_FAILED_TO_UPDATE_USER = 'ACTION_FAILED_TO_UPDATE_USER'
export const failedToUpdateUser = (error) => ({
  type: ACTION_FAILED_TO_UPDATE_USER,
  payload: error
})

export const ACTION_SET_USER_DATA = 'ACTION_SET_USER_DATA'
export const setUserData = (userData) => ({
  type: ACTION_SET_USER_DATA,
  payload: userData
})

export const ACTION_SET_REGISTRATION_USER = 'ACTION_SET_REGISTRATION_USER'
export const setRegistrationUser = (userData) => ({
  type: ACTION_SET_REGISTRATION_USER,
  payload: userData
})

export const ACTION_SET_AUTH_STATUS = 'ACTION_SET_AUTH_STATUS'
export const setAuthStatus = (status) => ({
  type: ACTION_SET_AUTH_STATUS,
  payload: status
})

export const ACTION_CHECK_AUTH = 'ACTION_CHECK_AUTH'
export const checkAuth = () => ({
  type: ACTION_CHECK_AUTH
})

export const ACTION_RESET_USERS_ERROR = 'ACTION_RESET_USERS_ERROR'
export const resetUserErrors = () => ({
  type: ACTION_RESET_USERS_ERROR
})
