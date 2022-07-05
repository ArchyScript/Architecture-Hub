import { fetchSingleUser } from '@/controller/api/users.api'
// import { User } from '@/controller/typings'

// const user: User = {}
// const user = {}
const user = {
  auth_user: {
    _id: '62a88a9675a64e7ba1a0c451',
    email: 'archyscript@gmail.com',
    username: 'ArchyScript',
    // password: '$2b$10$ergPB1hEOLFVk1e8OqEVTOphceNlA4k3OFvuaJ2bG8JmOKg8a8YmS',
    createdAt: '2022-06-14T13:18:14.209Z',
    updatedAt: '2022-06-14T13:18:14.209Z',
  },
  _id: '62a88a9675a64e7ba1a0c453',
  user_id: '62a88a9675a64e7ba1a0c451',
  is_active: false,
  posts: [],
  followers: [],
  followings: [
    {
      following_id: '62a88b4075a64e7ba1a0c457',
    },
    {
      following_id: '62a88b4075a64e7ba1a0c457',
    },
    {
      following_id: '62a88b4075a64e7ba1a0c457',
    },
    {
      following_id: '62a88b4075a64e7ba1a0c457',
    },
  ],
  bio: {
    firstname: 'Daniel',
    lastname: 'Dasaolu',
    display_name: 'Dasaolu Script',
    gender: '',
    about_me: `An Architecture Student || Front-end developer || JavaScript Lover || AI enthusiast || Music lover 🎸|| African`,
  },
  __v: 0,
  profile_picture: {
    title: 'profile-photo',
    cloudinary_id: 'h5msvmjtqocbnphob7yx',
    avatar:
      'https://res.cloudinary.com/yungscript/image/upload/v1656211374/h5msvmjtqocbnphob7yx.jpg',
  },
}

const state = {
  user,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhODhhOTY3NWE2NGU3YmExYTBjNDUxIiwiaWF0IjoxNjU2NDc4MTUyLCJleHAiOjE2NTY0NzgxNzJ9.eF4bRVJMmGyaOJ1Ru_KqrNn1CEXNaUYi3QruVqzIw2M',
  // token: null,
}

export default {
  namespaced: true,
  state,

  //
  getters: {
    //
    authenticateUser(state: any) {
      return !!state
    },
    //
    userToken: (state: any) => {
      return state.token
    },
    //
    allUsers: (state: any) => {
      return state
    },
    //
    getAuthUser: (state: any) => {
      return state.user
    },
    //
    getUser: (state: any) => {
      return state.user
    },
  },

  actions: {
    //
    async getUser({ commit }: any, user_id: string) {
      const response: any = await fetchSingleUser(user_id)

      const { data } = response

      console.log(data)

      commit('GET_USER', data)
    },
    //
    async assignToken({ commit }: any, token: any) {
      commit('ASSIGN_TOKEN', token)
    },
    //
    async updateUserData({ commit }: any, loggedInUser: any) {
      console.log(loggedInUser)

      commit('UPDATE_USER_DATA', 'updataed')
    },
  },

  //
  mutations: {
    //
    SET_USER(state: any, userData: any) {
      return (state.user = userData)
    },
    //
    ASSIGN_TOKEN: (state: any, token: any) => {
      console.log(token)
      return (state.token = token)
    },
    GET_USER: (state: any, user: any) => {
      return (state.user = user)
    },
  },
}
