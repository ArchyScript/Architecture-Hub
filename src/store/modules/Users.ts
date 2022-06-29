import { getUser } from '@/controller/api/users.api'
// import { User } from '@/controller/typings'

// const user: User = {}
const user = {}

const state = {
  user,
  // token:
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhODhhOTY3NWE2NGU3YmExYTBjNDUxIiwiaWF0IjoxNjU2NDc4MTUyLCJleHAiOjE2NTY0NzgxNzJ9.eF4bRVJMmGyaOJ1Ru_KqrNn1CEXNaUYi3QruVqzIw2M',
  token: null,
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
      const response: any = await getUser(user_id)

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
