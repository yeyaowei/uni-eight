<template>
  <div class="me new-type">
    <div class="page-body">
      <div class="block">
        <p class="text-title">{{ isLogged ? '姓名' : '那个...' }}</p>
        <p class="text-info">
          {{ isLogged ? name : '你是谁？' }}
        </p>
      </div>
      
      <template v-if="isLogged">
        <div class="block">
          <p class="text-title">学号</p>
          <p class="text-info">
            {{ id }}
          </p>
        </div>
        <div class="block">
          <p class="text-title">二外科目</p>
          <p class="text-info">
            {{ exclusiveText }}
          </p>
        </div>
      </template>

      <div v-show="!isLogged" class="block">
        <div class="button-item" hover-class="hover" :class="{ 'disabled': !canRegister}" @click="goRegister">
        <span>登记信息</span>
        </div>
      </div>
      <div class="block">
        <div class="button-item" hover-class="hover" @click="goToChangelog">
        <span>查看更新记录</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      canRegister: false
    }
  },
  computed: {
    name () {
      return this.$store.state.userInfo.name
    },
    id () {
      return this.$store.state.userInfo.id
    },
    exclusiveText() {
      return (['法语', '日语', '德语'])[this.$store.state.userInfo.exclusive]
    },
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  mounted () {
    if (!this.name) {
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud.callFunction({
        name: 'getUserInfo'
      }).then(res => {
        switch (res.result.msg) {
          case 'ok':
            this.$store.commit('saveUserInfo', res.result.userInfo)
            break
          case 'notRegistered':
            this.canRegister = true
            this.goRegister()
            break
          default:
            break
        }
      }).catch(res => {
        wx.showModal({
          content: '加载失败，请检查您的网络状况！',
          showCancel: false
        })
      }).then(() => {
        wx.hideLoading()
      })
    }
    // console.log(this.isLogged)
  },
  methods: {
    goRegister () {
      if (this.canRegister == false) return
      wx.navigateTo({
        url: '/pages/register/index'
      })
    },
    goToChangelog () {
      wx.navigateTo({
        url: `/pages/changelog/index?version=${this.$store.state.version}`
      })
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
}
</style>
