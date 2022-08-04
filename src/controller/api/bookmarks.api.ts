import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

export const addToBookmarked = async (params: any) => {
  const { user_id, post_id, post_type } = params
  try {
    const response = await default_axios_instance
      .patch(`bookmarks/add/${user_id}/${post_type}/${post_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const removeFromBookmarked = async (params: any) => {
  const { user_id, post_id, post_type } = params
  try {
    const response = await default_axios_instance
      .patch(`bookmarks/remove/${user_id}/${post_type}/${post_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
