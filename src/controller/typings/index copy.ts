// THIS FILE HOLDS ALL THE INTERFACES FOR THE APPLICATION
export type AnyObject = any
export type AsyncFunction = (headers?: AnyObject) => Promise<any>
export type DateString = string

export interface AsyncResponse {
  data: any
  error: string | string[] | null
  status: number | string
}

export type ToastAlertType = 'success' | 'info' | 'warn' | 'error'

export type ToastAlert = {
  message: string
  type: ToastAlertType
  id: number
}

export type User = {
  id: string
  email: string
  phone: string
  fullName: string
  activated: boolean
  hashedPassword: string
  flagged: boolean
  role: 'alumni' | 'facilitator'
  address: string
  country: string
  state: string
  linkedInProfile: string
  picture: string
  extra: {
    futureOfEducationResponse: string
    foundedBusinessResponse: boolean
    otherInformation: string
  }
}

export type UserWithToken = User & { token: string }

export type CourseVideo = {
  id: string
  courseId: string
  title: string
  description: string
  videoLink: string
  poster: string
  published: string
  createdAt: string
  updatedAt: string
}

export type Course = {
  id: string
  title: string
  description: string
  author: string
  poster: string
  price: number
  published: boolean
  createdAt: string
  updatedAt: string
  videos?: CourseVideo[]
}

export type PurchaseCoursePayload = {
  userId: string
  courseId: string
}
