import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

export const fetchAllUsers = async () => {
  try {
    const response = await default_axios_instance
      .get(`users`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const fetchSingleUserById = async (_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`users/_id/${_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const fetchSingleUserByUsername = async (
  username: string | string[],
) => {
  try {
    const response = await default_axios_instance
      .get(`users/username/${username}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const updateUserBio = async (_id: any, payload: any) => {
  try {
    const response = await default_axios_instance
      .patch(`users/update/bio/${_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const updateUserAuth = async (_id: any, payload: any) => {
  try {
    const response = await default_axios_instance
      .patch(`users/update/auth/${_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const deleteUser = async (_id: any) => {
  try {
    const response = await default_axios_instance
      .delete(`users/delete/${_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const uploadProfilePicture = async (_id: any, payload: any) => {
  const formData = new FormData()
  formData.append('profile-picture', payload)

  try {
    const response = await default_axios_instance
      .post(`users/profile/upload/${_id}`, formData, {
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

export const deleteProfilePicture = async (_id: any) => {
  try {
    const response = await default_axios_instance
      .delete(`users/profile/delete/${_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const followUser = async (params: any) => {
  const { current_user_id, user_to_follow_id } = params

  try {
    const response = await default_axios_instance
      .post(`users/follow/${current_user_id}/${user_to_follow_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const unfollowUser = async (params: any) => {
  const { current_user_id, user_to_unfollow_id } = params

  try {
    const response = await default_axios_instance
      .post(`users/unfollow/${current_user_id}/${user_to_unfollow_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const allUserFollowers = async (_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`users/followers/${_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const allUserFollowings = async (_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`users/followings/${_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
