<template>
  <div class="me">
    <div class="page-header">
      <p class="text-title">
        {{ isLogged ? '哦？' : '那个...'}}
        <br/>
        {{ isLogged ? '这不是' + name + '嘛！' : '你谁？'}}</p>
      <p class="text-desc">还没想好下面写些什么...</p>
    </div>
    <div class="page-body">
      <div class="button-item" hover-class="hover" v-show="!isLogged" @click="goRegister">
        <span>登记信息</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    name () {
      return this.$store.state.userInfo.name
    },
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  mounted () {
    if (!this.name) {
      wx.showLoading({title: '加载中'})
      wx.cloud.callFunction({
        name: 'getUserInfo'
      }).then(res => {
        wx.hideLoading()
        switch (res.result.msg) {
          case 'ok':
            this.$store.commit('saveUserInfo', res.result.userInfo)
            break
          case 'notRegistered':
            this.goRegister()
            break
          default:
            break
        }
      })
    }
    // console.log(this.isLogged)
  },
  methods: {
    goRegister () {
      wx.navigateTo({
        url: '/pages/register/index'
      })
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
}
.input-box {
  margin-top: 20px;
  .text-title {
    margin-left: 10px;
  }
  .text-input {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #afafaf;
  }
}
</style>
