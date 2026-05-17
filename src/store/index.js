import { createStore } from 'vuex'
import user from './modules/user'

export default createStore({
  state: {
  },
  getters: {
    token(state) {
      return state.user.userInfo?.token || ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})