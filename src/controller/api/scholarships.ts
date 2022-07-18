import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
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

//
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

//
export const createScholarship = async (creator_id: any, payload: any) => {
  try {
    const response = await default_axios_instance
      .post(`scholarships/${creator_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
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
//
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
