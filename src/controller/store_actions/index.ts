import axios from 'axios'

//
// HandleTokenResponse,m
export const getUserData = async (user_id: any) => {
  const response = await axios.get(`http://localhost:4000/api/users/${user_id}`)

  return response
}

export const follow = async () => {
  const response = await axios.get(`http://localhost:4000/api/posts`)

  return response
}
export const unfollow = async () => {
  const response = await axios.get(`http://localhost:4000/api/posts`)

  return response
}

// post
export const getAllPosts = async () => {
  const response = await axios.get(`http://localhost:4000/api/posts`)

  return response
}

// export const getAllPost = async () => {
//   const response = await axios.get(`http://localhost:4000/api/posts`)

//   return response
// }
// export const getAllPost = async () => {
//   const response = await axios.get(`http://localhost:4000/api/posts`)

//   return response
// }
// export const getAllPost = async () => {
//   const response = await axios.get(`http://localhost:4000/api/posts`)

//   return response
// }
// export const getAllPost = async () => {
//   const response = await axios.get(`http://localhost:4000/api/posts`)

//   return response
// }
