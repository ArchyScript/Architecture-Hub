import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
export const AuthApiService = {
  async loginWithEmail(payload: any) {
    try {
      const response = await default_axios_instance
        .post(`auth/login/email`, payload)
        .then(async (response) => response)
      return HandleAxiosResponse(response)
    } catch (error) {
      return HandleAxiosError(error)
    }
  },

  async loginWithUsername(payload: any) {
    try {
      const response = await default_axios_instance
        .post(`auth/login/username`, payload)
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
  async resetPasswoord(payload: any) {
    try {
      const response = await default_axios_instance
        .post(`auth/reset-password`, payload)
        .then(async (response) => response)

      return HandleAxiosResponse(response)
    } catch (error) {
      return HandleAxiosError(error)
    }
  },

  //
  async logout() {
    console.log(localStorage.getItem('user'))

    try {
      const response = await default_axios_instance
        .post(`auth/logout`)
        .then(async (response) => response)

      return HandleAxiosResponse(response)
    } catch (error) {
      return HandleAxiosError(error)
    }
  },
}
