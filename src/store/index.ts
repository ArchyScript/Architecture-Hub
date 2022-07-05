import { createStore } from 'vuex'
import { users } from './reerer/users'
import posts from './reerer/posts'

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
