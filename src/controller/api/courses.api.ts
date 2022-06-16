// import { catchAsync } from '../utilities'
// import { AnyObject, PurchaseCoursePayload } from '../typings'
// import { createAxiosInstance } from '.'

// const http = createAxiosInstance()

// export const CoursesApiService = {
//   getAvailableCourses () {
//     const request = ({ headers }: AnyObject) => http.get('/courses', { headers })
//     return catchAsync(request)
//   },

//   getPurchasedCourses () {
//     const request = ({ headers }: AnyObject) => http.get('/courses/purchased', { headers })
//     return catchAsync(request)
//   },

//   purchaseCourse (payload: PurchaseCoursePayload) {
//     const request = ({ headers }: AnyObject) => http.post('/courses/purchase', payload, { headers })
//     return catchAsync(request)
//   }
// }
