import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

export const fetchAllScholarships = async () => {
  try {
    const response = await default_axios_instance
      .get(`scholarships`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const fetchSingleScholarship = async (scholarships_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`scholarships/${scholarships_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const createScholarship = async (creator_id: any, payload: any) => {
  const { link, host, title, description, content, image_file } = payload
  const formData = new FormData()

  formData.append('scholarship-image', image_file)
  formData.append('host', host)
  formData.append('link', link)
  formData.append('description', description)
  formData.append('title', title)
  formData.append('content', content)

  try {
    const response = await default_axios_instance
      .post(`scholarships/${creator_id}`, formData)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const updateScholarship = async (params: any, payload: any) => {
  const { scholarships_id, creator_id } = params

  try {
    const response = await default_axios_instance
      .patch(`scholarships/${creator_id}/${scholarships_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

export const deleteScholarship = async (params: any) => {
  const { scholarships_id, creator_id } = params
  try {
    const response = await default_axios_instance
      .delete(`scholarships/${creator_id}/${scholarships_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
