import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {},
    homework: {
      done: []
    }
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
    },
    setHomeworkDoneState (state, payload) {
      const { id, isDone } = payload
      const done = state.homework.done
      const index = done.indexOf(id)
      if (isDone === true) {
        if (index === -1) {
          done.push(id)
        }
      } else {
        if (index !== -1) {
          done.splice(index, 1)
        }
      }
      wx.setStorageSync('homework.done', done)
    },
    loadHomeworkDoneState (state) {
      const done = wx.getStorageSync('homework.done')
      state.homework.done = done || []
    }
  },
  actions: {
    initialize ({ commit }) {
      commit('loadUserInfo')
      commit('loadHomeworkDoneState')
    }
  }
})

export default store
