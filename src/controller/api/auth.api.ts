import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
export const AuthApiService = {
  //
  async login(payload: any) {
    try {
      const response = await default_axios_instance
        .post(`auth/login`, payload)
        .then(async (response) => response)

      return HandleAxiosResponse(response)
    } catch (error) {
      return HandleAxiosError(error)
    }
  },

  //
  async signup(payload: any) {
    try {
      const response = await default_axios_instance
        .post(`auth/signup`, payload)
        .then(async (response) => response)

      return HandleAxiosResponse(response)
    } catch (error) {
      return HandleAxiosError(error)
    }
  },

  //
  resetPasswoord(payload: any) {
    console.log(payload)
  },

  //
  logout(payload: any) {
    localStorage.removeItem('user')
    console.log(payload)
  },
}
