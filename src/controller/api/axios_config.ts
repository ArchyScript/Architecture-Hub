import axios, { AxiosRequestHeaders } from 'axios'
const API_URL = 'http://localhost:4000/api/'
// let accessToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhODhhOTY3NWE2NGU3YmExYTBjNDUxIiwiaWF0IjoxNjU2NDQ1OTUzLCJleHAiOjE2NTY3MDUxNTN9.WRUxWDgTxp262MkMDu1gnmwW_G6mD8vlhJg-7F20oWI'

// console.log(accessTokenl)

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let accessToken = localStorage.getItem('user_token')
  accessToken = !accessToken || accessToken === undefined ? '' : accessToken

  //

  const headers = {
    'x-auth-token': accessToken,
    'X-Custom-Header': 'foofrtrtrtrtbar',
    Authorization: '',
  }

  console.log(headers)

  // if (!accessToken || accessToken === undefined) {
  //   return headers
  // }

  return headers
}

const default_axios_instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: getAuthHeaders(),
})

export default default_axios_instance
