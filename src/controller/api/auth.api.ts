import axios from 'axios'
const API_URL = 'http://localhost:4000/api/auth/'
// import { HandleAxiosRequest } from '../utilities'

// error handler
// request payload validation

// const validateLoginDetails = (email: string, password: string) => {
//   // if (!email)
// }

type LoginCredentialsType = {
  email: string
  password: string
}

export const AuthApiService = {
  login(login_credentials: any) {
    const { email, password } = login_credentials

    const response = axios
      .post(API_URL + 'login', {
        email: email.value,
        password: password.value,
      })
      .then(
        (response) => response,
        (error) => error,
      )

    // HandleAxiosRequest(response)

    return response
  },

  register(payload: any) {
    console.log('payload' + payload)
    // const request = () => http.post('/auth/register', payload)
    // console.log('request' + request)
    // return HandleAuthRequest(request)
  },

  resetPasswoord(payload: any) {
    // console.log('payload' + payload)
    // const request = () => http.post('/auth/reset-password', payload)
    // console.log('request' + request)
    // return HandleAuthRequest(request)
  },

  logout(payload: any) {
    // console.log('payload' + payload)
    // const request = () => http.post('/auth/reset-password', payload)
    // console.log('request' + request)
    // return HandleAuthRequest(request)
  },
}
