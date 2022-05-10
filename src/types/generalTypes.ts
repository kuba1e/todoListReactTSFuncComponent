interface IUserData {
  email: string
  id: string
  isActivated: boolean
}

interface IUser {
  accessToken: string
  refreshToken: string
  user: IUserData
}

interface ITodo {
  id: number
  label: string
  done: boolean
}

interface ICredentials {
  email: string
  password: string
}

interface IUserProfile extends ICredentials {
  id: string
}

interface IUserToUpdate {
  email: string
  newPassword?: string
  oldPassword: string
  id: string
}

export class ErrorResponse {
  constructor(public message: string, public status: number) {}
}

export class InternalServerError implements ErrorResponse {
  constructor(public message: string, public status: number) {}
}

export { IUserData, IUser, ITodo, ICredentials, IUserProfile, IUserToUpdate }
