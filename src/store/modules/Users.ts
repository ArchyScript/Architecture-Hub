import { getUser } from '@/controller/api/users.api'

export default {
  namespaced: true,
  state: {
    token: 'null',
    user: {},
  },

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
    getUser: (state: any) => {
      return state.user
    },
  },

  actions: {
    //
    async getUser({ commit }: any, user_id: string) {
      const response: any = await getUser(user_id)

      const { data } = response

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
