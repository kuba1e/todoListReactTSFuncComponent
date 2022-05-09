interface IUserData {
  email: string
  id: string
  isActivated: boolean
}

export interface IUser {
  accessToken: string
  refreshToken: string
  user: IUserData
}

export interface ITodo {
  id: number
  // user_id: string
  label: string
  done: boolean
}

export interface ICredetnials {
  email: string
  password: string
}

export interface UserProfile extends ICredetnials {
  id: string
}
