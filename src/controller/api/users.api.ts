// import axios from 'axios'
import default_axios_instance from './axios_config'
// const API_URL = 'http://localhost:4000/api'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
export const getAllUsers = async () => {
  try {
    const response = await default_axios_instance
      .get(`users`)
      .then(async (response) => response)

    console.log(response)
    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}

//
export const getUser = async (user_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`users/${user_id}`)
      .then(async (response) => response)
    console.log(response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error.response)
    return HandleAxiosError(error)
  }
}

//
export const updateUserCredentials = async (params: any, payload: any) => {
  const { user_id, user_password } = params

  try {
    const response = await default_axios_instance
      .patch(`auth/update-user/${user_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}

//
export const updateUserData = async (user_id: any, payload: any) => {
  console.log(payload)

  try {
    const response = await default_axios_instance
      .patch(`users/${user_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}

//
export const deleteUser = async (user_id: any) => {
  try {
    const response = await default_axios_instance
      .delete(`users/${user_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}

//
export const uploadProfilePicture = async (user_id: any, payload: any) => {
  const formData = new FormData()
  formData.append('profile-picture', payload)

  try {
    const response = await default_axios_instance
      .post(`users/profile/${user_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const follow = async (params: any) => {
  const { current_user_id, another_user_id } = params

  try {
    const response = await default_axios_instance
      .post(`users/follow/${current_user_id}/${another_user_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error.response)
    return HandleAxiosError(error)
  }
}

//
export const unfollow = async (params: any) => {
  const { current_user_id, another_user_id } = params

  try {
    const response = await default_axios_instance
      .post(`users/unfollow/${current_user_id}/${another_user_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}

// get all user followers
export const allFollowers = async (user_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`users/followers/${user_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}

// get all user followings
export const allFollowings = async (user_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`users/followings/${user_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    console.log(error)
    return HandleAxiosError(error)
  }
}
