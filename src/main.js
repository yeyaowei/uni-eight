import Vue from 'vue'
import App from './App'
import WXRequest from './utils/wx-request'
Vue.prototype.$wxhttp = WXRequest
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
  traceUser: true
})
Vue.prototype.$db = wx.cloud.database()

const app = new Vue(App)
app.$mount()
