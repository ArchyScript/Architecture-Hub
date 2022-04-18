import { createStore } from 'vuex'
// import Users from './modules/Users'
// console.log(Users)
const Users = [
  {
    id: 1,
    username: 'ArchyScript',
    email: 'yungdansa@gmail.co',
    password: 'Archy',
    token: null,
  },
  {
    id: 2,
    username: 'ArchyScript',
    email: 'yungdansa@gmail.com',
    password: 'Script',
    token: null,
  },
]

export default createStore({
  state: {
    allUsers: [],
    user: {
      id: 2,
      username: 'ArchyScript',
      email: 'yungdansa@gmail.com',
      password: 'Script',
      token: null,
    },
  },
  getters: {
    allUsers: (state) => {
      console.log(state.allUsers)

      return state.allUsers
    },
  },
  actions: {
    async getAllUsers({ commit }) {
      const response = Users

      // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
      commit('GET_ALL_USERS', response)
    },
    // async getSingleUsers({ commit }) {
    //   const response = await Users

    //   // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
    //   commit('getSingleUsers', response)
    // },
  },
  mutations: {
    GET_ALL_USERS: (state, users) => {
      // console.log(users)
      return (state.allUsers = users)
    },
    // getSingleUsers: (state, users) => {
    //   state.allUsers.forEach((eachUser) => {
    //     if (eachUser.email === state.user.email) {
    //       console.log(eachUser)
    //     } else return
    //   })
    //   // return setAndUpdateTodosStatus(state.allUsers, state.todosStatus)
    //   return (state.allUsers = users)
    // },
  },
  modules: {},
})
