<template>
  <div>
    <div class="page-header">
      <p class="text-title">{{ version }} 版更新记录</p>
      <p class="text-desc">小程序已升级到新版本！</p>
      <p class="text-desc">本次是一次小更新！</p>
    </div>
    <div class="page-body">
      <p class="text-title">作业查询</p>
      <p class="text-desc bold">新功能</p>
      <p class="text-desc">· 作业现在可以按截止时间排序</p>
      <p class="text-desc bold">Bug 修复</p>
      <p class="text-desc">· 已截止作业倒计时显示有误的情况</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: ''
    }
  },
  mounted () {
    this.version = this.$root.$mp.query.version
  }
}
</script>

<style>

</style>
