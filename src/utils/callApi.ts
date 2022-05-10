export const callApi = async (path: string, params = {}) => {
  try {
    const baseUrl = process.env.BASE_URL
    const { method = 'GET', data, ...otherOptions } = params
    const token = localStorage.getItem('token')?.slice(1, -1) ?? ''
    const options = {
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

    const response = await fetch(baseUrl + path, options)

    const parsedResponse = await response.json()

    if (response.status === 401) {
      const response = await callApi('/refresh')
      localStorage.setItem('token', JSON.stringify(response.accessToken))
      return await callApi(path, params)
    }

    if (!response.ok) {
      throw new Error(parsedResponse.message)
    }

    if (response.status === 400) {
      new DbConcurrencyError(response.data, response.status)
    }

    if (response.status === 500) {
      new InternalServerError(response.data, response.status)
    }

    // Generic Error Response
    return new ErrorResponse(response.data, response.status)

    return parsedResponse.data
  } catch (error) {
    throw new Error(error.message)
  }
}
