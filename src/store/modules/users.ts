import { fetchAllUsers, fetchSingleUserById } from '@/controller/api/users.api'
const all_users: any = []
const auth_user: any = {}
const user: any = {}

const state = {
  auth_user,
  all_users,
  token: null,
}

export const users = {
  namespaced: true,
  state,
  getters: {
    userToken: (state: any) => {
      return state.token
    },
    getAuthUser: (state: any) => {
      return state.auth_user
    },
    getAllUser: (state: any) => {
      return state.all_users
    },
  },

  actions: {
    async assignToken({ commit }: any, token: any) {
      commit('ASSIGN_TOKEN', token)
    },

    async getAuthUser({ commit }: any, user_id: any) {
      const response: any = await fetchSingleUserById(user_id)
      const { data } = response

      commit('SET_AUTH_USER', data)
    },

    async getAllUser({ commit }: any) {
      const response: any = await fetchAllUsers()
      const { data } = response

      commit('SET_ALL_USERS', data)
    },
  },

  //
  mutations: {
    ASSIGN_TOKEN: (state: any, token: any) => {
      return (state.token = token)
    },

    SET_AUTH_USER(state: any, data: any) {
      if (!data) return

      return (state.auth_user = data)
    },

    SET_ALL_USERS(state: any, data: any) {
      return (state.all_users = data)
    },
  },
}
