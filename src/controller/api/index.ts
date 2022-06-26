/* eslint-disable camelcase */
// import https from 'https'
import axios, { AxiosRequestHeaders } from 'axios'

export const API_BASE_URL =
  (process.env.API_BASE_URL as string) || 'http://localhost/api'

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  const userInSession = localStorage.getItem('user') || ''
  const parsed = userInSession ? JSON.parse(userInSession) : ''
  // console.log(axios.)

  if (!parsed || !parsed.token) {
    return {
      headers: {
        // default headers token
        Authorization: '',
      },
    }
  }

  return {
    headers: {
      // set user token and validates token from here
      Authorization: `Bearer ${parsed.token}`,
    },
  }
}

// export const createAxiosInstance = (baseURL = '') => {
//   return axios.create({
//     baseURL: baseURL || API_BASE_URL,
//   })
// }

axios.defaults.baseURL = 'http://localhost:4000/api'

// export default axios.create({
//   baseURL: 'http://localhost:4000/api',
//   headers: {
//     'Content-type': 'application/json',
//   },
// })
