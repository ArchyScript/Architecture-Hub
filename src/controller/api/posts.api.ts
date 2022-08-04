import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

export const fetchAllPosts = async () => {
  try {
    const response = await default_axios_instance
      .get(`/posts`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const fetchSinglePost = async (_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`/posts/${_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

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

export const createNewPostWithoutImage = async (
  poster_id: any,
  content: any,
) => {
  const payload = { content }

  try {
    const response = await default_axios_instance
      .post(`posts/new/${poster_id}`, payload)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const createNewPostWithImage = async (
  poster_id: string | number,
  payload: any,
) => {
  const { content, image_file } = payload

  const formData = new FormData()
  formData.append('post-image', image_file)
  formData.append('content', content)

  try {
    const response = await default_axios_instance
      .post(`posts/new/upload/${poster_id}`, formData)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

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

export const deletePost = async (params: any) => {
  const { poster_id, post_id } = params

  try {
    const response = await default_axios_instance
      .delete(`/posts/${poster_id}/${post_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
