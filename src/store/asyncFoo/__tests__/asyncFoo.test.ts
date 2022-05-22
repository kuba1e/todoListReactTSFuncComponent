import { InternalServerError, ErrorResponse } from '../../../types/generalTypes'
import {
  loginUserFunc,
  userRegistrationFunc,
  updateUserProfileFunc,
  checkAuthFunc,
  fetchTodosFunc,
  fetchNotifications,
  sendToAddTodoFunc,
  sendToUpdateTodoFunc,
  sendToUpdateAllTodoFunc,
  sendToDeleteTodoFunc
} from '../asyncFoo'

describe('test  asynchronius function', () => {
  it('should test loginUserFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              userInfo: {
                user: {
                  email: 'test',
                  id: '1',
                  isActivated: true
                },
                accessToken: 'test',
                refreshToken: 'test'
              },
              notifications: []
            }
          })
      })
    ) as jest.Mock

    const result = await loginUserFunc({
      email: 'test',
      password: 'asdsad'
    })

    expect(result).toEqual({
      userInfo: {
        user: {
          email: 'test',
          id: '1',
          isActivated: true
        },
        accessToken: 'test',
        refreshToken: 'test'
      },
      notifications: []
    })
  })

  it('should test failed loginUserFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await loginUserFunc({
        email: 'test',
        password: 'asdsad'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })

  it('should test userRegistrationFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              userInfo: {
                user: {
                  email: 'test',
                  id: '1',
                  isActivated: true
                },
                accessToken: 'test',
                refreshToken: 'test'
              },
              notifications: []
            }
          })
      })
    ) as jest.Mock

    const result = await userRegistrationFunc({
      email: 'test',
      password: 'asdsad'
    })

    expect(result).toEqual({
      userInfo: {
        user: {
          email: 'test',
          id: '1',
          isActivated: true
        },
        accessToken: 'test',
        refreshToken: 'test'
      },
      notifications: []
    })
  })

  it('should test failed userRegistrationFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await userRegistrationFunc({
        email: 'test',
        password: 'asdsad'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorResponse)
    }
  })

  it('should test updateUserProfileFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              user: {
                user: {
                  email: 'test',
                  id: '1',
                  isActivated: true
                },
                accessToken: 'test',
                refreshToken: 'test'
              },
              notifications: []
            }
          })
      })
    ) as jest.Mock

    const result = await updateUserProfileFunc({
      email: 'test123',
      id: '1',
      oldPassword: 'test123'
    })

    expect(result).toEqual({
      user: {
        email: 'test',
        id: '1',
        isActivated: true
      },
      accessToken: 'test',
      refreshToken: 'test'
    })
  })

  it('should test failed updateUserProfileFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await updateUserProfileFunc({
        email: 'test123',
        id: '1',
        oldPassword: 'test123'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorResponse)
    }
  })

  it('should test checkAuthFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              userInfo: {
                user: {
                  email: 'test',
                  id: '1',
                  isActivated: true
                },
                accessToken: 'test',
                refreshToken: 'test'
              },
              notifications: []
            }
          })
      })
    ) as jest.Mock

    const result = await checkAuthFunc()

    expect(result).toEqual({
      userInfo: {
        user: {
          email: 'test',
          id: '1',
          isActivated: true
        },
        accessToken: 'test',
        refreshToken: 'test'
      },
      notifications: []
    })
  })

  it('should test failed checkAuthFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await checkAuthFunc()
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })

  it('should test fetchTodosFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              todos: [
                {
                  id: 1,
                  label: 'test',
                  order_num: 1,
                  done: false
                },
                {
                  id: 2,
                  label: 'updated',
                  order_num: 2,
                  done: true
                }
              ]
            }
          })
      })
    ) as jest.Mock

    const abortController = new AbortController()

    const result = await fetchTodosFunc(abortController.signal)

    expect(result).toEqual({
      todos: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ]
    })
  })

  it('should test failed fetchTodosFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      const abortController = new AbortController()

      await fetchTodosFunc(abortController.signal)
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorResponse)
    }
  })

  it('should test fetchNotifications', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              data: {
                id: 1,
                label: 'test',
                order_num: 1,
                done: false
              },
              notification: {
                type: 'delete',
                id: 1,
                message: {
                  id: 1,
                  label: 'test',
                  order_num: 1,
                  done: false
                },
                hidden: false,
                date: new Date('2022-03-05')
              }
            }
          })
      })
    ) as jest.Mock

    const result = await fetchNotifications()

    expect(result).toEqual({
      data: {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      notification: {
        type: 'delete',
        id: 1,
        message: {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    })
  })

  it('should test failed fetchNotifications', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await fetchNotifications()
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })

  it('should test sendToAddTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              data: {
                id: 3,
                label: 'test',
                order_num: 3,
                done: false
              },
              notification: {
                type: 'add',
                id: 1,
                message: {
                  id: 3,
                  label: 'test',
                  order_num: 3,
                  done: false
                },
                hidden: false,
                date: new Date('2022-03-05')
              }
            }
          })
      })
    ) as jest.Mock

    const result = await sendToAddTodoFunc([
      'test123',
      [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'test2',
          order_num: 2,
          done: false
        }
      ]
    ])

    expect(result).toEqual({
      data: {
        id: 3,
        label: 'test',
        order_num: 3,
        done: false
      },
      notification: {
        type: 'add',
        id: 1,
        message: {
          id: 3,
          label: 'test',
          order_num: 3,
          done: false
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    })
  })

  it('should test failed sendToAddTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await sendToAddTodoFunc([
        'test123',
        [
          {
            id: 1,
            label: 'test',
            order_num: 1,
            done: false
          },
          {
            id: 2,
            label: 'test2',
            order_num: 2,
            done: false
          }
        ]
      ])
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorResponse)
    }
  })

  it('should test sendToUpdateTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              data: {
                id: 3,
                label: 'test123',
                order_num: 4,
                done: true
              },
              notification: {
                type: 'edit',
                id: 1,
                message: {
                  id: 3,
                  label: 'test123',
                  order_num: 4,
                  done: true
                },
                hidden: false,
                date: new Date('2022-03-05')
              }
            }
          })
      })
    ) as jest.Mock

    const result = await sendToUpdateTodoFunc({
      id: 3,
      label: 'test123',
      order_num: 4,
      done: true
    })

    expect(result).toEqual({
      data: {
        id: 3,
        label: 'test123',
        order_num: 4,
        done: true
      },
      notification: {
        type: 'edit',
        id: 1,
        message: {
          id: 3,
          label: 'test123',
          order_num: 4,
          done: true
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    })
  })

  it('should test failed sendToUpdateTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await sendToUpdateTodoFunc({
        id: 3,
        label: 'test123',
        order_num: 4,
        done: true
      })
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })

  it('should test sendToUpdateAllTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              todos: [
                {
                  id: 1,
                  label: 'test',
                  order_num: 1,
                  done: false
                },
                {
                  id: 2,
                  label: 'updated',
                  order_num: 2,
                  done: true
                }
              ]
            }
          })
      })
    ) as jest.Mock

    const result = await sendToUpdateAllTodoFunc([
      {
        id: 1,
        label: 'test',
        order_num: 1,
        done: false
      },
      {
        id: 2,
        label: 'updated',
        order_num: 2,
        done: true
      }
    ])

    expect(result).toEqual({
      todos: [
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ]
    })
  })

  it('should test failed sendToUpdateAllTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await sendToUpdateAllTodoFunc([
        {
          id: 1,
          label: 'test',
          order_num: 1,
          done: false
        },
        {
          id: 2,
          label: 'updated',
          order_num: 2,
          done: true
        }
      ])
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })

  it('should test sendToDeleteTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              data: {
                id: 3,
                label: 'test123',
                order_num: 4,
                done: true
              },
              notification: {
                type: 'delete',
                id: 1,
                message: {
                  id: 3,
                  label: 'test123',
                  order_num: 4,
                  done: true
                },
                hidden: false,
                date: new Date('2022-03-05')
              }
            }
          })
      })
    ) as jest.Mock

    const result = await sendToDeleteTodoFunc(3)

    expect(result).toEqual({
      data: {
        id: 3,
        label: 'test123',
        order_num: 4,
        done: true
      },
      notification: {
        type: 'delete',
        id: 1,
        message: {
          id: 3,
          label: 'test123',
          order_num: 4,
          done: true
        },
        hidden: false,
        date: new Date('2022-03-05')
      }
    })
  })

  it('should test failed sendToDeleteTodoFunc', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Error'
          })
      })
    ) as jest.Mock

    try {
      await sendToDeleteTodoFunc(3)
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorResponse)
    }
  })
})
