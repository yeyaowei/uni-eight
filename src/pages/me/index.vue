<template>
  <div class="me">
    <div class="page-header">
      <p class="text-title">欢迎你</p>
      <p class="text-desc">你好啊</p>
      <button @click="goRegister">登录</button>
    </div>
    <div class="page-body"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$db
      .collection('students')
      .where({
        _openid: '{openid}'
      })
      .get()
      .then(res => {
        if (res.data.length === 0) {
          this.goRegister()
        }
      })
  },
  methods: {
    goRegister () {
      wx.navigateTo({
        url: '/pages/register/main'
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
