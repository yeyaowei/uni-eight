<template>
  <div class="me">
    <div class="page-header">
      <p class="text-title">确认你的身份</p>
      <p class="text-desc">务必填写真实信息，系统会进行核对。</p>
    </div>
    <div class="page-body">
      <div class="input-box">
        <input placeholder="请输入姓名" v-model="name" type="text" class="text-input">
      </div>
      <div class="input-box">
        <input placeholder="请输入完整学号" v-model="id" type="text" class="text-input">
      </div>
      <div class="input-box">
        <div class="button-item" hover-class="hover" :class="{ 'disabled': !isButtonEnabled }" @click="signUp">登记</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      id: ''
    }
  },
  computed: {
    isButtonEnabled () {
      return (this.name && this.id)
    }
  },
  methods: {
    signUp () {
      wx.showLoading({title: '加载中'})
      wx.cloud.callFunction({
        name: 'register',
        data: {
          name: this.name,
          id: this.id
        }
      }).then(res => {
        wx.hideLoading()
        if (res.result.msg !== 'ok') {
          wx.showModal({
            content: res.result.msg,
            showCancel: false
          })
        } else {
          this.saveUserInfo(res.result.userInfo)
          wx.navigateBack()
        }
      })
    },
    saveUserInfo (data) {
      this.$store.commit('saveUserInfo', data)
    }
  }
}
</script>

<style lang="scss">
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
    background: #f3f3f3;
    border-radius: 3px;
    &::placeholder {
      color: #e0e0e0;
    }
  }
}
</style>
