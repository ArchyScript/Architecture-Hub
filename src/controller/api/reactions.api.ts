import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
export const commentOnPost = async (params: any, payload: any) => {
  const { commenter_id, post_id } = params

  try {
    const response = await default_axios_instance
      .post(`reactions/comments/${commenter_id}/${post_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
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
//
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

//
export const likePost = async (params: any) => {
  const { liker_id, post_id } = params

  try {
    const response = await default_axios_instance
      .post(`reactions/likes/${liker_id}/${post_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const reverseLike = async (params: any) => {
  const { liker_id, like_id } = params
  try {
    const response = await default_axios_instance
      .delete(`reactions/likes/${liker_id}/${like_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
