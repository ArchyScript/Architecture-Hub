// modules/crypto.js

export default {
  namespaced: true,
  state: {
    data: {},
  },
  getters: {
    data: (state: any) => state.data,
  },
  actions: {
    async getData({ commit }: any) {
      const data = await fetch('https://api.coincap.io/v2/assets')
      commit('SET_DATA', await data.json())
    },
  },
  mutations: {
    SET_DATA(state: any, data: any) {
      state.data = data
    },
  },
}
