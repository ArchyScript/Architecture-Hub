// import axios from 'axios'
// const API_URL = 'http://localhost:4000/api'
// import {
//   HandleAxiosResponse,
//   HandleAxiosError,
// } from '../utilities/axios_return_response'

// //
// export const getAllPosts = async () => {
//   try {
//     const response = await axios
//       .get(`${API_URL}/posts`)
//       .then(async (response) => response)

//     console.log(response)
//     return HandleAxiosResponse(response)
//   } catch (error) {
//     console.log(error)
//     return HandleAxiosError(error)
//   }
// }

// //
// export const getSinglePost = async (post_id: any) => {
//   try {
//     const response = await axios
//       .get(`${API_URL}/posts/${post_id}`)
//       .then(async (response) => response)

//     return HandleAxiosResponse(response)
//   } catch (error) {
//     console.log(error)
//     return HandleAxiosError(error)
//   }
// }

// //
// export const createNewPost = async (user_id: any, payload: any) => {
//   try {
//     const response = await axios
//       .post(`${API_URL}/users/${user_id}`, payload)
//       .then((response) => response)

//     return HandleAxiosResponse(response)
//   } catch (error) {
//     console.log(error)
//     return HandleAxiosError(error)
//   }
// }

// //
// export const updatePost = async (params: any, payload: any) => {
//   const { user_id, post_id } = params

//   try {
//     const response = await axios
//       .patch(`${API_URL}/users/${user_id}/${post_id}`, payload)
//       .then((response) => response)

//     return HandleAxiosResponse(response)
//   } catch (error) {
//     console.log(error)
//     return HandleAxiosError(error)
//   }
// }

// //
// export const deletePost = async (params: any) => {
//   const { user_id, post_id } = params

//   try {
//     const response = await axios
//       .delete(`${API_URL}/users/${user_id}/${post_id}`)
//       .then((response) => response)

//     return HandleAxiosResponse(response)
//   } catch (error) {
//     console.log(error)
//     return HandleAxiosError(error)
//   }
// }
