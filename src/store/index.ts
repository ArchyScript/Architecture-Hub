import { createStore } from 'vuex'
import { users } from './modules/users'
import posts from './modules/posts'

interface StoreInterface {
  users: any
  posts: any
}

// export default createStore({
export default createStore<StoreInterface>({
  modules: {
    users: users,
    posts: posts,
  },
})
