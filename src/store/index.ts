import { createStore } from 'vuex'
import users from './modules/users'
import crypto from './modules/crypto'

interface StoreInterface {
  users: any
  crypto: any
}

// export default createStore({
export default createStore<StoreInterface>({
  modules: {
    users,
    crypto,
  },
})
