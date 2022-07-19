import { createStore } from 'vuex'
import { users } from './modules/auth_users'
import posts from './modules/posts'
import component_handler from './modules/component_handler'

interface StoreInterface {
  users: any
  posts: any
  component_handler: any
}

// export default createStore({
export default createStore<StoreInterface>({
  modules: {
    users,
    posts,
    component_handler,
  },
})
