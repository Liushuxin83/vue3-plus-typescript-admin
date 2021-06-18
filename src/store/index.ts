import { createStore } from 'vuex'
// 数据持久化  第一步
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  // 数据持久化  第二步
  plugins: [createPersistedState()],
  state: {
    userInfo: null
  },
  mutations: {},
  actions: {},
  modules: {}
})
