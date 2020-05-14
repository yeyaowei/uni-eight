import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    isLogged: state => {
      return !!state.userInfo.name
    }
  },
  mutations: {
    saveUserInfo (state, payload) {
      state.userInfo = payload
      wx.setStorageSync('userInfo', payload)
    },
    loadUserInfo (state) {
      const userInfo = wx.getStorageSync('userInfo')
      // console.log(userInfo)
      state.userInfo = userInfo
    }
  }
})

export default store
