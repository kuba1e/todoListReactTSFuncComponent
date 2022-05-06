export const callApi = async (method, path, data) => {
  try {
    const baseUrl = process.env.BASE_URL
    const token = localStorage.getItem('token')?.slice(1, -1) ?? ''
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...(token ? { credentials: 'include' } : {})
    }

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(baseUrl + path, options)

    const parsedResponse = await response.json()

    if (response.status === 401) {
      const response = await callApi('GET', '/refresh')
      localStorage.setItem('token', JSON.stringify(response.accessToken))
      return await callApi(method, path, data)
    }

    if (!response.ok) {
      throw new Error(parsedResponse.message)
    }

    return parsedResponse.data
  } catch (error) {
    throw new Error(error.message)
  }
}
