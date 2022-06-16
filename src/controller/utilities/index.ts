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

export const HandleAuthRequest = async (
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

export const logDataToConsole = (...args: any[]) => {
  if (location?.host.includes('localhost')) {
    // console.log(...args)
    // console.log('testing 3')
  }
}

export const formatCurrency = (value: string) => {
  const valueIsInvalid =
    [null, undefined].includes(value as any) || isNaN(parseInt(value))

  if (valueIsInvalid) {
    return 'Not Available'
  }

  const stringAsNumber = Number(value)
  const formattedVAlue = new Intl.NumberFormat().format(stringAsNumber)
  return '₦' + formattedVAlue
}
