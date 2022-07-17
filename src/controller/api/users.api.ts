import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
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

//
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

//
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

export const updateUser = async (_id: any, payload: any) => {
  try {
    const response = await default_axios_instance
      .patch(`users/update/${_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
// export const updateUserData = async (_id: any, payload: any) => {

//   try {
//     const response = await default_axios_instance
//       .patch(`users/${_id}`, payload)
//       .then(async (response) => response)

//     return HandleAxiosResponse(response)
//   } catch (error) {
//     return HandleAxiosError(error)
//   }
// }

//
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

//
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

//
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

//
export const follow = async (params: any) => {
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

//
export const unfollow = async (params: any) => {
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

// get all user followers
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

// get all user followings
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
