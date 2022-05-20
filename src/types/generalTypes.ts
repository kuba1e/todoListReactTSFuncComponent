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
  order_num: number
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

export interface INotification {
  type: string
  message: ITodo
  id: number
  hidden: boolean
  date: Date
}

export interface IStatistic {
  edit: number
  add: number
  delete: number
  date: string
}

export class ErrorResponse {
  constructor(public message: string, public status: number) {}
}

export class InternalServerError implements ErrorResponse {
  constructor(public message: string, public status: number) {}
}

export interface UnknownAction {
  type: ''
  payload: ''
}

export enum TodosEvents {
  add = 'Added todo',
  delete = 'Deleted todo',
  edit = 'Edited todo'
}

export { IUserData, IUser, ITodo, ICredentials, IUserProfile, IUserToUpdate }
