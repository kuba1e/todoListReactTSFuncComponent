import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import faker from '@faker-js/faker'

import {
  userRegistrationWatcher,
  updateUserProfileWatcher,
  loginUserWatcher,
  UserData,
  checkAuthWatcher,
  logoutUserWatcher
} from '../userSaga'
import {
  userRegistrationFunc,
  updateUserProfileFunc,
  loginUserFunc,
  checkAuthFunc,
  logoutUserFunc
} from '../../../asyncFoo'
import {
  setRegistrationUser,
  userRegistration,
  updateUser,
  setUserData,
  setAuthStatus,
  loginUser,
  checkAuth,
  getNotifications,
  logoutUser,
  failedToLoginUser,
  failedToLogoutUser,
  failedToRegisterUser,
  failedToUpdateUser
} from '../../../actions/user'
import { IUserReducer } from '../../../../types/user'
import { userReducer } from '../../../reducers/user/userReducer'
import { ErrorResponse } from '../../../../types/generalTypes'
import { throwError } from 'redux-saga-test-plan/providers'

describe('test user saga', () => {
  it('should test login user', async () => {
    const initialState: IUserReducer = {
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

    const email = faker.internet.email()
    const id = faker.random.numeric()
    const accessToken = faker.datatype.uuid()
    const refreshToken = faker.datatype.uuid()

    const fakeResponse: UserData = {
      userInfo: {
        user: {
          email,
          id,
          isActivated: true
        },
        accessToken,
        refreshToken
      },
      notifications: []
    }

    const { storeState } = await expectSaga(loginUserWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(loginUserFunc), fakeResponse]])
      .put(setUserData(fakeResponse.userInfo.user))
      .put(setAuthStatus(true))
      .dispatch(
        loginUser({
          email,
          password: faker.internet.password()
        })
      )
      .silentRun()

    expect(storeState).toEqual({
      isAuth: true,
      isRegistered: false,
      loading: 'idle',
      userData: {
        email,
        id,
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    })
  })

  it('should test failed to login user', async () => {
    const initialState: IUserReducer = {
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

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(loginUserWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(loginUserFunc), throwError(error)]])
      .put(failedToLoginUser(error.message))
      .dispatch(
        loginUser({
          email: faker.internet.email(),
          password: faker.internet.password()
        })
      )
      .silentRun()

    expect(storeState).toEqual({
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
    })
  })

  it('should test logout user', async () => {
    const email = faker.internet.email()
    const id = faker.random.numeric()

    const initialState: IUserReducer = {
      isAuth: true,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id,
        email,
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const { storeState } = await expectSaga(logoutUserWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(logoutUserFunc), 'nothing']])
      .put(setAuthStatus(false))
      .put(
        setUserData({
          email: '',
          id: '',
          isActivated: false
        })
      )
      .dispatch(logoutUser())
      .silentRun()

    expect(storeState).toEqual({
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        email: '',
        id: '',
        isActivated: false
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    })
  })

  it('should test failed to logout user', async () => {
    const initialState: IUserReducer = {
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

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(logoutUserWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(logoutUserFunc), throwError(error)]])
      .put(failedToLogoutUser(error.message))
      .dispatch(logoutUser())
      .silentRun()

    expect(storeState).toEqual({
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
    })
  })

  it('should test user registration', async () => {
    const initialState: IUserReducer = {
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

    const { storeState } = await expectSaga(userRegistrationWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(userRegistrationFunc), 'nothing']])
      .put(setRegistrationUser(true))
      .dispatch(
        userRegistration({
          email: 'test',
          password: 'test'
        })
      )
      .silentRun()

    expect(storeState).toEqual({
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
    })
  })

  it('should test failed registrtion user', async () => {
    const initialState: IUserReducer = {
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

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(userRegistrationWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(userRegistrationFunc), throwError(error)]])
      .put(failedToRegisterUser(error.message))
      .dispatch(
        userRegistration({
          email: faker.internet.email(),
          password: faker.internet.password()
        })
      )
      .silentRun()

    expect(storeState).toEqual({
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
    })
  })

  it('should test updating user profile', async () => {
    const initialState: IUserReducer = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id: '1',
        email: 'test@gmail.com',
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const fakeUpdatedUser = {
      id: '1',
      email: 'test1@gmail.com',
      isActivated: true
    }

    const { storeState } = await expectSaga(updateUserProfileWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(updateUserProfileFunc), fakeUpdatedUser]])
      .put(setUserData(fakeUpdatedUser))
      .dispatch(
        updateUser({
          id: '1',
          oldPassword: 'test',
          newPassword: 'test1',
          email: 'test1@gmail.com'
        })
      )
      .silentRun()

    expect(storeState).toEqual({
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: fakeUpdatedUser,
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    })
  })

  it('should test failed to update user', async () => {
    const id = 'test'
    const email = faker.internet.email()

    const initialState: IUserReducer = {
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id,
        email,
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(updateUserProfileWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(updateUserProfileFunc), throwError(error)]])
      .put(failedToUpdateUser(error.message))
      .dispatch(
        updateUser({
          id: 'test',
          email: faker.internet.email(),
          oldPassword: faker.internet.password()
        })
      )
      .silentRun()

    expect(storeState).toEqual({
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id,
        email,
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '404',
      logoutError: ''
    })
  })

  it('should test check authentification user', async () => {
    const initialState: IUserReducer = {
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

    const email = faker.internet.email()
    const id = faker.random.numeric()
    const accessToken = faker.datatype.uuid()
    const refreshToken = faker.datatype.uuid()

    const fakeResponse: UserData = {
      userInfo: {
        user: {
          email,
          id,
          isActivated: true
        },
        accessToken,
        refreshToken
      },
      notifications: []
    }

    const { storeState } = await expectSaga(checkAuthWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(checkAuthFunc), fakeResponse]])
      .put(getNotifications(fakeResponse.notifications))
      .put(setUserData(fakeResponse.userInfo.user))
      .put(setAuthStatus(true))
      .dispatch(checkAuth())
      .silentRun()

    expect(storeState).toEqual({
      isAuth: true,
      isRegistered: false,
      loading: 'idle',
      userData: {
        email,
        id,
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    })
  })

  it('should test failed to  check user authentification ', async () => {
    const id = 'test'
    const email = faker.internet.email()

    const initialState: IUserReducer = {
      isAuth: true,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id,
        email,
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    }

    const error = new ErrorResponse('404', 404, 'response error')

    const { storeState } = await expectSaga(checkAuthWatcher)
      .withReducer(userReducer, initialState)
      .provide([[matchers.call.fn(checkAuthFunc), throwError(error)]])
      .put(setAuthStatus(false))
      .dispatch(checkAuth())
      .silentRun()

    expect(storeState).toEqual({
      isAuth: false,
      isRegistered: false,
      loading: 'idle',
      userData: {
        id,
        email,
        isActivated: true
      },
      loginError: '',
      registrError: '',
      updateError: '',
      logoutError: ''
    })
  })
})
