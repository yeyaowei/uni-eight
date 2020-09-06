import Vue from 'vue'
import App from './App'
import store from './store/main'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'
Vue.mixin({
  onUnload () {
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
store.dispatch('initialize')
const app = new Vue({
  store,
  ...App
})
app.$mount()
