<template>
  <div class="container home">
    <div class="page-header">
      <div class="text-title">
        17级英语8班
      </div>
      <p class="text-desc">不知道说点啥...</p>
    </div>
    <div class="page-body">
      <div class="list">
        <div class="button-item" @click="goToPage('homework')">
          <span>作业查询</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="text-desc">暂时只有看作业这个功能，等后续开发...</p>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goToPage (page) {
      wx.navigateTo({
        url: '/pages/' + page + '/main'
      })
    },
    getUserInfo (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
.footer {
  text-align: center;
  position: fixed;
  bottom: 20px;
  width: 100%;
}
</style>