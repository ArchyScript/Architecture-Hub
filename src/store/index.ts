import { createStore } from 'vuex'
import { users } from './modules/users'
import component_handler from './modules/component_handler'
import _requests from './modules/_requests'

interface StoreInterface {
  users: any
  component_handler: any
  _requests: any
}

export default createStore<StoreInterface>({
  modules: {
    users,
    component_handler,
    _requests,
  },
})
