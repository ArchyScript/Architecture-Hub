import { createStore } from 'vuex'
import users from './modules/users'
import crypto from './modules/crypto'

// console.log(users)
// const moduleA = {
//   state: () => ({}),
//   mutations: {},
//   actions: {},
//   getters: {},
// }

// const moduleB = {
//   namespaced: true,
//   state: () => ({}),
//   mutations: {},
//   actions: {},
// }

// interface StoreInterface {
//   users: any
//   // lastname: string
// }

// export default createStore<StoreInterface>({
export default createStore({
  modules: {
    users,
    crypto,
  },
})

// console.log()
