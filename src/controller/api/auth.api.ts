import axios from 'axios'
const API_URL = 'http://localhost:4000/api'
import './index'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'
import router from '@/router'

export const AuthApiService = {
  //
  async login(payload: any) {
    try {
      const response = await axios
        .post(`${API_URL}/auth/login`, payload)
        .then(async (response) => response)

      return HandleAxiosResponse(response)
    } catch (error) {
      return HandleAxiosError(error)
    }
  },

  //
  async signup(payload: any) {
    try {
      const response = await axios
        .post(`${API_URL}/auth/signup`, payload)
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
    router.push('/auth/signup')
  },
}
