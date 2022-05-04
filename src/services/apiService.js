const getFetchOptions = (method, token, data) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include'
  }

  if (method !== 'GET' && data) {
    options.body = JSON.stringify(data)
  }
  return options
}

const apiService = async (method, path, data) => {
  try {
    const baseUrl = 'http://localhost:4000'
    const token = localStorage.getItem('token')?.slice(1, -1) ?? ''
    let response = null
    if (method === 'GET') {
      const options = getFetchOptions('GET', token)
      response = await fetch(baseUrl + path, options)
      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
      return parsedResponse.data
    }
    if (method === 'POST') {
      const options = getFetchOptions('POST', token, data)
      response = await fetch(baseUrl + path, options)

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
      return parsedResponse.data
    }

    if (method === 'PUT') {
      const options = getFetchOptions('PUT', token, data)

      response = await fetch(`${baseUrl}${path ? `${path}` : ''}`, options)

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
      return
    }

    if (method === 'DELETE') {
      const options = getFetchOptions('DELETE', token, data)

      response = await fetch(`${baseUrl}${path}`, options)

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
      return
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default apiService
