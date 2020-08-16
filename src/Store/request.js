import Config from '../App'
import Axios from 'axios'
import Cookies from 'js-cookie'
const env = Config.env

export const requestApi = (
  path,
  method = 'GET',
  body = null,
  requiresAuth = false,
  creds = null
) => {
  const url = `${Config[env].apiBaseUrl}${path}`

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    withCredentials: true
  }

  if (body !== null) {
    options.data = JSON.stringify(body)
  }

  if (requiresAuth) {
    const token = Cookies.getJSON('token')

    options.headers.Authorization = `Bearer ${token}`
  }

  return Axios(url, options)
}
