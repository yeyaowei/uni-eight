import Vue from 'vue'
import App from './App'
import store from './store/main'

Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
Vue.mixin({
  onUnload: function () {
    if (this.$options.data) {
      if (this.intervalIds) {
        for (const id of this.intervalIds) {
          clearInterval(id)
        }
      }
      Object.assign(this.$data, this.$options.data())
    }
  }
})

wx.cloud.init({
  env: 'class-eight-01fjv',
  traceUser: true
})
Vue.prototype.$db = wx.cloud.database()
store.commit('loadUserInfo')
const app = new Vue(App)
app.$mount()
