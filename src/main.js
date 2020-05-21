import Vue from 'vue'
import App from './App'
import store from './store/main'

Vue.prototype.$store = store
Vue.config.productionTip = false
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
const app = new Vue(App)
app.$mount()
