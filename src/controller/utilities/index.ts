import { AxiosError, AxiosResponse } from 'axios'
import { getAuthHeaders } from '../api'
import { AsyncFunction, AsyncResponse } from '../typings'

export const getErrorMessage = (error: AxiosError & Error) => {
  if (error.response?.data?.message) {
    const message = error.response?.data?.message
    const errorIsArray = Array.isArray(message)

    return errorIsArray ? message[0] : message
  }

  if (error?.response?.data?.defaultUserMessage) {
    const message = error.response?.data?.defaultUserMessage
    const errorIsArray = Array.isArray(message)

    return errorIsArray ? message[0] : message
  }

  return error.message || 'Sorry, an error occurred'
}

export const HandleAxiosRequest = async (
  asyncMethod: AsyncFunction,
): Promise<AsyncResponse> => {
  try {
    console.log(getAuthHeaders)
    const { headers } = getAuthHeaders()
    const response: AxiosResponse = await asyncMethod({ headers })

    return {
      data: response.data,
      error: null,
      status: response.status,
    }
  } catch (error) {
    const status = error.response?.status || 0
    const message = getErrorMessage(error)

    return {
      data: null,
      error: message,
      status,
    }
  }
}

export const logDataToConsole = (args: any[]) => {
  // if (location?.host.includes('localhost')) {
  // console.log('test')
  // console.log(args)
  // }
}

export const formatNumbers = (number: number) => {
  if (number > 999 && number < 1000000) return (number / 1000).toFixed(1) + 'K'

  if (number > 1000000 && number < 1000000000)
    return (number / 1000000).toFixed(1) + 'M'

  if (number > 1000000000 && number < 1000000000000)
    return (number / 1000000000).toFixed(1) + 'B'

  if (number > 1000000000000) return (number / 1000000000000).toFixed(1) + 'T'

  if (number < 900) return number
}
