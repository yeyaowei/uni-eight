import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    version: '1.4.0',
    userInfo: {},
    homework: {
      done: [],
      sortedByTime: true
    },
    cache: {
      homework: null,
      timetable: null
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
      wx.setStorageSync('homework', state.homework)
    },
    setHomeworkSubscribeState (state, payload) {
      const { id, isSubscribed } = payload
      const subscribed = state.homework.subscribed
      const index = subscribed.indexOf(id)
      if (isSubscribed === true) {
        if (index === -1) {
          subscribed.push(id)
        }
      } else {
        if (index !== -1) {
          subscribed.splice(index, 1)
        }
      }
      wx.setStorageSync('homework', state.homework)
    },
    loadHomework (state) {
      const homework = wx.getStorageSync('homework')
      if (homework) {
        state.homework = homework
      }
    },
    setHomeworkValue (state, payload) {
      state.homework[payload.name] = payload.value
      wx.setStorageSync('homework', state.homework)
    },
    saveCache (state, payload) {
      const { name, data } = payload
      state.cache[name] = data
      wx.setStorageSync('cache', state.cache)
    },
    loadCache (state) {
      const cache = wx.getStorageSync('cache')
      if (cache) {
        state.cache = cache
      }
    }
  },
  actions: {
    initialize ({ commit, state }) {
      commit('loadUserInfo')
      commit('loadHomework')
      commit('loadCache')

      // 1.1.0 作业提交状态
      const homeworkDone = wx.getStorageSync('homework.done')
      if (homeworkDone) {
        commit('setHomeworkValue', {
          name: 'done',
          value: homeworkDone
        })
        wx.removeStorageSync('homework.done')
      }
    },
    removeInvalidHomework({ commit, state }, homeworkList) {
      const result = state.homework.done.filter(e => homeworkList.includes(e))
      commit('setHomeworkValue', {
        name: 'done',
        value: result
      })
    }
  }
})

export default store
