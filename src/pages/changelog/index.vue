<template>
  <div style="padding-bottom: 30px;">
    <div class="page-header">
      <p class="text-title">{{ version }} 版更新记录</p>
      <p class="text-desc">小程序已升级到新版本！</p>
      <p class="text-desc">可能是毕业的最后一个版本了...</p>
    </div>
    <div class="page-body">
      <p class="text-title">课程表</p>
      <p class="text-desc">· 可以在本周课程安排中，看到下周新增的课程（没用了）</p>
      <p class="text-desc">· 如果本课程在下周结课会有提示（也没用了）</p>
      <p class="text-desc bold">Bug 修复</p>
      <p class="text-desc">· 修复课程表有时候会出现 undefined 和 null 的情况。</p>
      <p class="text-desc bold">没了！</p>
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

<style lang="scss">
.text-title {
  &:not(:first-child) {
    margin-top: 24px;
  }
}
</style>
