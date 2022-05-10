import {
  ErrorResponse,
  InternalServerError,
  IUser
} from '../types/generalTypes'

interface Params {
  method?: string
  data?: any
  signal?: AbortSignal
}

interface ParsedResponse {
  data?: any
  message: string
}

export async function callApi<T>(path: string, params?: Params): Promise<T> {
  try {
    const baseUrl = process.env.BASE_URL
    const { method = 'GET', data, ...otherOptions } = params ?? {}
    const token = localStorage.getItem('token')?.slice(1, -1) ?? ''
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: 'include',
      ...otherOptions
    }

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data)
    }

    const response: Response = await fetch(baseUrl + path, options)
    console.log(response)

    const parsedResponse: ParsedResponse = await response.json()

    if (response.status === 401) {
      const response: IUser = await callApi('/refresh')
      localStorage.setItem('token', JSON.stringify(response.accessToken))
      return await callApi(path, params)
    }

    if (response.status === 400) {
      throw new ErrorResponse(parsedResponse.message, response.status)
    }

    if (response.status === 500) {
      throw new InternalServerError(parsedResponse.message, response.status)
    }

    return parsedResponse.data
  } catch (error) {
    throw error
  }
}
