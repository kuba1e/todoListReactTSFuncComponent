import { userReducer } from '../userReducer'
import {
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser,
  loginUser,
  logoutUser,
  resetUserErrors,
  setAuthStatus,
  setRegistrationUser,
  setUserData,
  updateUser,
  userRegistration
} from '../../../actions/user'

describe('test user reducer', () => {
  it('should return intial state', () => {
    const initialState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(undefined, { type: '', payload: '' })).toEqual(
      initialState
    )
  })

  it('should handle user sign in', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '404',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(
      userReducer(
        previousState,
        loginUser({
          email: 'test@gmail.com',
          password: '123456'
        })
      )
    ).toEqual(nextState)
  })

  it('should handle user sign in unsuccessful', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '404',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, failedToLoginUser('404'))).toEqual(
      nextState
    )
  })

  it('should handle user logout ', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: '404'
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, logoutUser())).toEqual(nextState)
  })

  it('should handle user logout unsuccessful ', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: 'weqw',
        email: 'test@gmail.com',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: '404'
    }

    expect(userReducer(previousState, failedToLogoutUser('404'))).toEqual(
      nextState
    )
  })

  it('should handle user registration', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '404',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(
      userReducer(
        previousState,
        userRegistration({ email: 'test@gmail.com', password: 'test' })
      )
    ).toEqual(nextState)
  })

  it('should handle user registration unsuccessful', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '404',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, failedToRegisterUser('404'))).toEqual(
      nextState
    )
  })

  it('should handle user update', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '404',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(
      userReducer(
        previousState,
        updateUser({
          id: 'test',
          email: 'test@gmail.com',
          newPassword: 'test12345',
          oldPassword: 'test54321'
        })
      )
    ).toEqual(nextState)
  })

  it('should handle user update unsuccessful', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '404',
      logoutError: ''
    }

    expect(userReducer(previousState, failedToUpdateUser('404'))).toEqual(
      nextState
    )
  })

  it('should handle setting user data', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: 'test',
        email: 'test@gmail.com',
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(
      userReducer(
        previousState,
        setUserData({
          id: 'test',
          email: 'test@gmail.com',
          isActivated: true
        })
      )
    ).toEqual(nextState)
  })

  it('should handle setting authentification status', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: true,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, setAuthStatus(true))).toEqual(nextState)
  })

  it('should handle setting registration status', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: true,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, setRegistrationUser(true))).toEqual(
      nextState
    )
  })

  it('should handle setting registration status', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const nextState = {
      isAuth: false,
      isRegistered: true,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, setRegistrationUser(true))).toEqual(
      nextState
    )
  })

  it('should handle reset user errors', () => {
    const previousState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '404',
      registrError: '404',
      updateError: '404',
      logoutError: '404'
    }

    const nextState = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '',
        email: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    expect(userReducer(previousState, resetUserErrors())).toEqual(nextState)
  })
})
