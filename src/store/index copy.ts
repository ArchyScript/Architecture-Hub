// import { UserWithToken } from '@/controller/typings/index'
// import { createStore } from 'vuex'
// // import Users from './modules/Users'
// // console.log(Users)
// export type AppState = {
//   authUser: UserWithToken | {}
// }
// export type Mutations = 'setUser' | 'setCourses' | 'addToast' | 'removeToast'

// const Users = [
//   {
//     id: 1,
//     username: 'ArchyScript',
//     email: 'yungdansa@gmail.co',
//     password: 'Archy',
//   },
//   {
//     id: 2,
//     username: 'ArchyScript',
//     email: 'yungdansa@gmail.com',
//     password: 'Script',
//   },
// ]

// export default createStore({
//   state: {
//     allUsers: [],
//     user: {
//       username: '',
//       email: '',
//       password: '',
//     },
//     token: null,
//   },
//   getters: {
//     authenticateUser(state) {
//       return !!state
//     },
//     allUsers: (state) => {
//       // console.log(state.allUsers)

//       return state.allUsers
//     },
//     singleUser: (state) => {
//       return state.user
//     },
//   },
//   actions: {
//     async getAllUsers({ commit }) {
//       const response = Users
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('GET_ALL_USERS', response)
//     },

//     async updateLoggedInUser({ commit }, loggedInUser) {
//       const response = await loggedInUser
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('UPDATE_LOGGED_IN_USER', response)
//     },
//     async addSignedInUser({ commit }, signedUpUser) {
//       const response = await signedUpUser
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('ADD_SIGNED_UP_USER', response)
//     },
//     async updateUserToken({ commit }, token) {
//       const response = await token
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('UPDATE_USER_TOKEN', response)
//     },
//     // async getSingleUsers({ commit }) {
//     //   const response = await Users

//     //   // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//     //   commit('getSingleUsers', response)
//     // },
//   },
//   mutations: {
//     SET_USER(state, userData) {
//       state.user = userData
//     },
//     GET_ALL_USERS: (state, users) => {
//       // console.log(users)
//       return (state.allUsers = users)
//     },
//     UPDATE_LOGGED_IN_USER: (state, loggedInUser) => {
//       return (state.user = loggedInUser)
//     },
//     ADD_SIGNED_UP_USER: (state, newUser) => {
//       // [...state.allUsers, newUser]
//       return console.log(newUser)
//     },
//     UPDATE_USER_TOKEN: (state, token) => {
//       return (state.token = token)
//     },
//     // getSingleUsers: (state, users) => {
//     //   state.allUsers.forEach((eachUser) => {
//     //     if (eachUser.email === state.user.email) {
//     //       console.log(eachUser)
//     //     } else return
//     //   })
//     //   // return setAndUpdateTodosStatus(state.allUsers, state.todosStatus)
//     //   return (state.allUsers = users)
//     // },
//   },
//   modules: {},
// })
