import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
export const fetchAllCompetitions = async () => {
  try {
    const response = await default_axios_instance
      .get(`competitions`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const fetchSingleCompetition = async (competition_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`competitions/${competition_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const createCompetition = async (creator_id: any, payload: any) => {
  try {
    const response = await default_axios_instance
      .post(`competitions/${creator_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const updateCompetition = async (params: any, payload: any) => {
  const { competition_id, creator_id } = params

  try {
    const response = await default_axios_instance
      .patch(`competitions/${creator_id}/${competition_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
//
export const deleteCompetition = async (params: any) => {
  const { competition_id, creator_id } = params
  try {
    const response = await default_axios_instance
      .delete(`competitions/${creator_id}/${competition_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}
