import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

export const commentOnPost = async (params: any, payload: any) => {
  const { commenter_id, post_id, post_type } = params

  try {
    const response = await default_axios_instance
      .post(
        `reactions/${post_type}/comments/${commenter_id}/${post_id}`,
        payload,
      )
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const specificComment = async (params: any) => {
  const { post_type, comment_id } = params

  try {
    const response = await default_axios_instance
      .get(`reactions/${post_type}/comments/${comment_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const singleCommentOnPost = async (comment_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`reactions/comments/${comment_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const deleteComment = async (params: any) => {
  const { commenter_id, comment_id } = params
  try {
    const response = await default_axios_instance
      .delete(`reactions/comments/${commenter_id}/${comment_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const all___Comments = async (post_type: any) => {
  try {
    const response = await default_axios_instance
      .get(`reactions/${post_type}/comments`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const all___Likes = async (post_type: any) => {
  try {
    const response = await default_axios_instance
      .get(`reactions/${post_type}/likes`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const createNewLike = async (params: any) => {
  const { liker_id, post_id, post_type } = params
  const payload = { like_type: 'heart' }

  try {
    const response = await default_axios_instance
      .post(`reactions/${post_type}/likes/${liker_id}/${post_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const reverseLike = async (params: any) => {
  const { post_type, liker_id, like_id } = params
  try {
    const response = await default_axios_instance
      .delete(`reactions/${post_type}/likes/${liker_id}/${like_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
