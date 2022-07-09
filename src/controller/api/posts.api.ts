// import { default_axios_instance } from './axios_config'

import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'
import default_axios_instance from './axios_config'

//
export const fetchAllPosts = async () => {
  try {
    const response = await default_axios_instance
      .get(`/posts`)
      .then(async (response) => response)

    console.log(response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const fetchSinglePost = async (post_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`/posts/${post_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const createNewPost = async (post_id: string | number, payload: any) => {
  try {
    const response = await default_axios_instance
      .post(`posts/new/${post_id}`, payload)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const updatePost = async (params: any, payload: any) => {
  const { user_id, post_id } = params

  try {
    const response = await default_axios_instance
      .patch(`/posts/${user_id}/${post_id}`, payload)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const deletePost = async (params: any) => {
  const { user_id, post_id } = params

  try {
    const response = await default_axios_instance
      .delete(`/users/${user_id}/${post_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
