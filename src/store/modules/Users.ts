// import axios from 'axios'
export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    authenticateUser(state: any) {
      return !!state
    },
    allUsers: (state: any) => {
      console.log(state)

      return state
    },
    singleUser: (state: any) => {
      return state
    },
  },

  actions: {
    async getAllUsers({ commit }: any) {
      // const response = Users
      // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
      commit('GET_ALL_USERS', 'response')
    },

    async updateLoggedInUser({ commit }: any, loggedInUser: any) {
      const response = await loggedInUser
      // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
      commit('UPDATE_LOGGED_IN_USER', response)
    },
    async addSignedInUser({ commit }: any, signedUpUser: any) {
      const response = await signedUpUser
      // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
      commit('ADD_SIGNED_UP_USER', response)
    },
    async updateUserToken({ commit }: any, token: any) {
      const response = await token
      // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
      commit('UPDATE_USER_TOKEN', response)
    },
    async getSingleUsers({ commit }: any) {
      // const response = await Users

      // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
      commit('getSingleUsers', 'response')
    },
  },

  mutations: {
    SET_USER(state: any, userData: any) {
      state.user = userData
    },
    GET_ALL_USERS: (state: any, users: any) => {
      return (state.allUsers = users)
    },
    UPDATE_LOGGED_IN_USER: (state: any, loggedInUser: any) => {
      return (state.user = loggedInUser)
    },
    ADD_SIGNED_UP_USER: (state: any, newUser: any) => {
      return console.log(newUser)
    },
    UPDATE_USER_TOKEN: (state: any, token: any) => {
      return (state.token = token)
    },
  },
}
