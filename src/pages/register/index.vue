<template>
  <div class="me">
    <div class="page-header">
      <p class="text-title">第一次使用？请先登记您的信息</p>
      <p class="text-desc">务必填写真实信息，系统会进行核对。</p>
    </div>
    <div class="page-body">
      <div class="input-box">
        <input placeholder="请输入姓名" v-model.lazy="name" type="text" class="text-input">
      </div>
      <div class="input-box">
        <input placeholder="请输入长学号" v-model.lazy="id" type="text" class="text-input">
      </div>
      <div class="input-box">
        <div class="button-item" @click="signUp">登记</div>
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
  methods: {
    getUserInfo (e) {
      console.log(e)
    },
    signUp () {
      wx.cloud.callFunction({
        name: 'register',
        data: {
          name: this.name,
          id: this.id
        }
      }).then(res => {
        if (res.result.msg !== 'ok') {
          wx.showModal({
            content: res.result.msg,
            showCancel: false
          })
        } else {
          wx.navigateBack()
        }
      })
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
