import axios, { AxiosRequestHeaders } from 'axios'
const API_URL = 'https://architecture-hub.adaptable.app/api/'

// verify auth tokenn before any request

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let accessToken = localStorage.getItem('user_token')

  accessToken = !accessToken || accessToken === undefined ? '' : accessToken

  const headers = {
    'x-auth-token': accessToken,
  }

  return headers
}

const default_axios_instance = axios.create({
  baseURL: API_URL,
  headers: getAuthHeaders(),
})

export default default_axios_instance
