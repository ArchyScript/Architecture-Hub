// // import { createStore } from 'vuex'
// // import { UserWithToken, PostSchema } from '@/controller/typings/index'

// import axios from 'axios'

// // export type AppState = {
// //   authUser: UserWithToken
// //   posts: PostSchema[]
// // }

// // export type Mutations = 'setUser' | 'setCourses' | 'addToast' | 'removeToast'

// export const users = {
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
//     authenticateUser(state: any) {
//       return !!state
//     },
//     allUsers: (state: any) => {
//       // console.log(state.allUsers)

//       return state.allUsers
//     },
//     singleUser: (state: any) => {
//       return state.user
//     },
//   },

//   actions: {
//     async getAllUsers({ commit }) {
//       // const response = Users
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('GET_ALL_USERS', 'response')
//     },

//     async updateLoggedInUser({ commit }, loggedInUser: any) {
//       const response = await loggedInUser
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('UPDATE_LOGGED_IN_USER', response)
//     },
//     async addSignedInUser({ commit }, signedUpUser: any) {
//       const response = await signedUpUser
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('ADD_SIGNED_UP_USER', response)
//     },
//     async updateUserToken({ commit }, token: any) {
//       const response = await token
//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('UPDATE_USER_TOKEN', response)
//     },
//     async getSingleUsers({ commit }) {
//       // const response = await Users

//       // Commit takes in two parameters... first is the mutation we want to call and the second one is the data we want to send
//       commit('getSingleUsers', 'response')
//     },
//   },

//   mutations: {
//     SET_USER(state: any, userData: any) {
//       state.user = userData
//     },
//     GET_ALL_USERS: (state: any, users: any) => {
//       // console.log(users)
//       return (state.allUsers = users)
//     },
//     UPDATE_LOGGED_IN_USER: (state: any, loggedInUser: any) => {
//       return (state.user = loggedInUser)
//     },
//     ADD_SIGNED_UP_USER: (state: any, newUser: any) => {
//       // [...state.allUsers, newUser]
//       return console.log(newUser)
//     },
//     UPDATE_USER_TOKEN: (state: any, token: any) => {
//       return (state.token = token)
//     },
//     // getSingleUsers: (state:any, users) => {
//     //   state.allUsers.forEach((eachUser) => {
//     //     if (eachUser.email === state.user.email) {
//     //       console.log(eachUser)
//     //     } else return
//     //   })
//     //   // return setAndUpdateTodosStatus(state.allUsers, state.todosStatus)
//     //   return (state.allUsers = users)
//     // },
//   },
//   // modules: {},
// }
