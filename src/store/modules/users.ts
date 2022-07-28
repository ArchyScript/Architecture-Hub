import {
  fetchAllUsers,
  fetchSingleUserById,
  fetchSingleUserByUsername,
} from '@/controller/api/users.api'
// import { User } from '@/controller/typings'

// const user = {}

// const user = {
//   profile_picture: {
//     title: 'ArchyScript',
//     avatar:
//       'https://res.cloudinary.com/yungscript/image/upload/v1658020151/u2bcyfzpyjgphabrdghf.jpg',
//     cloudinary_id: 'u2bcyfzpyjgphabrdghf',
//   },
//   bio: {
//     description: '',
//     date_of_birth: '',
//     firstname: 'Dan',
//     lastname: 'Doe',
//     display_name: 'Vue Beast',
//     gender: '',
//   },
//   is_admin: false,
//   _id: '62cab7cdc0873b83d04dfd6f',
//   // _id: '62d35f18c30a727a977af4d2',
//   email: 'archyscript@gmail.COM',
//   username: 'ArchyScript',
//   is_active: false,
//   posts: [
//     {
//       post_id: '62d73d184c314bc46ec9968e',
//     },
//     {
//       post_id: '62d737e01e57c7dc6c3b902f',
//     },
//     {
//       post_id: '62d35b88d0cc24780439d1aa',
//     },
//     {
//       post_id: '62d2fe8c5a47dfd3b446573a',
//     },
//     {
//       post_id: '62d2fe6b5a47dfd3b4465735',
//     },
//     {
//       post_id: '62d239362958d12c2a2392a9',
//     },
//   ],
//   followers: [
//     {
//       follower_id: '62cab7cdc0873b83d04dfd6f',
//     },
//   ],
//   followings: [
//     {
//       following_id: '62d35f18c30a727a977af4d2',
//     },
//     {
//       following_id: '62caf49618b95c9b2fd9fd78',
//     },
//     {
//       following_id: '62caf49618b95c9b2fd9fd78',
//     },
//     {
//       following_id: '62caf49618b95c9b2fd9fd78',
//     },
//     {
//       following_id: '62a88b4075a64e7ba1a0c457',
//     },
//   ],
//   createdAt: '2022-07-10T11:28:13.651Z',
//   updatedAt: '2022-07-19T23:24:08.831Z',
//   __v: 0,
//   bookmarked_posts: [],
// }
// const auth_user = {
//   profile_picture: {
//     title: 'ArchyScript',
//     avatar:
//       'https://res.cloudinary.com/yungscript/image/upload/v1658020151/u2bcyfzpyjgphabrdghf.jpg',
//     cloudinary_id: 'u2bcyfzpyjgphabrdghf',
//   },
//   bio: {
//     description: '',
//     date_of_birth: '',
//     firstname: 'Dan',
//     lastname: 'Doe',
//     display_name: 'Vue Beast',
//     gender: 'male',
//   },
//   is_admin: false,
//   _id: '62cab7cdc0873b83d04dfd6f',
//   // _id: '62d35f18c30a727a977af4d2',
//   email: 'archyscript@gmail.COM',
//   username: 'ArchyScript',
//   is_active: false,
//   posts: [
//     {
//       post_id: '62d73d184c314bc46ec9968e',
//     },
//     {
//       post_id: '62d737e01e57c7dc6c3b902f',
//     },
//     {
//       post_id: '62d35b88d0cc24780439d1aa',
//     },
//     {
//       post_id: '62d2fe8c5a47dfd3b446573a',
//     },
//     {
//       post_id: '62d2fe6b5a47dfd3b4465735',
//     },
//     {
//       post_id: '62d239362958d12c2a2392a9',
//     },
//   ],
//   followers: [
//     {
//       follower_id: '62cab7cdc0873b83d04dfd6f',
//     },
//   ],
//   followings: [
//     {
//       following_id: '62d35f18c30a727a977af4d2',
//     },
//     {
//       following_id: '62caf49618b95c9b2fd9fd78',
//     },
//     {
//       following_id: '62caf49618b95c9b2fd9fd78',
//     },
//     {
//       following_id: '62caf49618b95c9b2fd9fd78',
//     },
//     {
//       following_id: '62a88b4075a64e7ba1a0c457',
//     },
//   ],
//   createdAt: '2022-07-10T11:28:13.651Z',
//   updatedAt: '2022-07-19T23:24:08.831Z',
//   __v: 0,
//   bookmarked: [
//     {
//       post_id: '62d737e01e57c7dc6c3b902f',
//       post_type: 'post',
//     },
//   ],
// }

const all_users: any = []
const auth_user: any = {}
const user: any = {}

const state = {
  user,
  auth_user,
  all_users,
  // token:
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhODhhOTY3NWE2NGU3YmExYTBjNDUxIiwiaWF0IjoxNjU2NDc4MTUyLCJleHAiOjE2NTY0NzgxNzJ9.eF4bRVJMmGyaOJ1Ru_KqrNn1CEXNaUYi3QruVqzIw2M',
  token: null,
}

export const users = {
  namespaced: true,
  state,
  getters: {
    userToken: (state: any) => {
      return state.token
    },
    getUser: (state: any) => {
      return state.user
    },
    getAuthUser: (state: any) => {
      return state.auth_user
    },
    getAllUser: (state: any) => {
      return state.all_users
    },
  },

  actions: {
    async getUser({ commit }: any, user_id: string) {
      const response: any = await fetchSingleUserById(user_id)
      const { data } = response

      commit('SET_USER', data)
    },
    //
    async assignToken({ commit }: any, token: any) {
      console.log(`token `, localStorage.getItem('token'))

      commit('ASSIGN_TOKEN', token)
    },

    async getAuthUser({ commit }: any, user_id: any) {
      // async getAuthUser({ commit }: any, payload: any) {
      // const { _type, username, user_id } = payload

      const response: any = await fetchSingleUserById(user_id)
      const { data } = response

      commit('SET_AUTH_USER', data)
      // if (_type === '_id') {
      //   const response: any = await fetchSingleUserById(user_id)
      //   const { data } = response

      //   commit('SET_AUTH_USER', data)
      // }
      // if (_type === 'username') {
      //   const response: any = await fetchSingleUserByUsername(username)
      //   const { data } = response

      //   commit('SET_AUTH_USER', data)
      // }
    },
    async getAllUser({ commit }: any) {
      const response: any = await fetchAllUsers()
      const { data } = response

      commit('SET_ALL_USERS', data)
    },
  },

  //
  mutations: {
    //
    SET_USER(state: any, data: any) {
      return (state.user = data)
    },
    //
    ASSIGN_TOKEN: (state: any, token: any) => {
      return (state.token = token)
    },
    //
    SET_AUTH_USER(state: any, data: any) {
      if (!data) return

      return (state.auth_user = data)
    },
    //
    SET_ALL_USERS(state: any, data: any) {
      return (state.all_users = data)
    },
  },
}
