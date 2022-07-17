import { fetchSingleUserById } from '@/controller/api/users.api'
// import { User } from '@/controller/typings'

const user = {
  auth_user: {
    _id: '62a88a9675a64e7ba1a0c451',
    email: 'archyscript@gmail.com',
    username: 'ArchyScript',
  },
  _id: '62cb0cabf71b79b564754d74',
  is_active: false,
  posts: [],
  followers: [],
  followings: [],
  bookmarked_posts: [],
  bio: {
    display_name: '',
    description: 'wjbewelwewle;wewejhwijl',
    date_of_birth: '',
    firstname: 'Testimony',
    lastname: 'Catfish',
    gender: 'male',
  },
  email: 'scripticologist@gmail.com',
  username: 'Scripticologist',
  createdAt: '2022-07-10T17:30:20.016Z',
  updatedAt: '2022-07-16T02:12:17.515Z',
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

export const users = {
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
      const response: any = await fetchSingleUserById(user_id)
      const { data } = response

      console.log(data)

      commit('SET_USER', data)
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
