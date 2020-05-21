<template>
  <div>
    <div class="page-header">
      <p class="text-title">{{ version }} 版更新记录</p>
      <p class="text-desc">小程序已升级到新版本！</p>
      <p class="text-desc">来看看都有哪些新变化吧~</p>
    </div>
    <div class="page-body">
      <p class="text-title">作业查询</p>
      <p class="text-desc">作业查询界面全新升级！</p>
      <p class="text-desc bold">新功能</p>
      <p class="text-desc">· 现在可以显示每项作业的名称</p>
      <p class="text-desc">· 现在可以标记作业完成状态</p>
      <p class="text-desc">· 带有文件的作业现在可以获取下载链接手动下载</p>
      <p class="text-desc">· 加入了这个崭新的更新记录页面~</p>
      <p class="text-desc bold">Bug 修复</p>
      <p class="text-desc">· 已截止作业倒计时出现负数的情况</p>
      <p class="text-desc bold">调整</p>
      <p class="text-desc">· 一些样式上的修改</p>
    </div>
    <div class="page-header">
      <p class="text-title">暂时不会加入的功能</p>
      <p class="text-desc">可能是由于技术受限，可能是还不知道咋做...</p>
    </div>
    <div class="page-body">
      <p class="text-desc bold">订阅通知</p>
      <p class="text-desc">个人小程序没那个资质，可以是可以但是很麻烦。</p>
      <p class="text-desc">不仅对我麻烦对你们也很麻烦23333</p>
      <p class="text-desc">未来的时间里会尝试寻求其他解决方案。</p>
    </div>
    <div class="page-header">
      <p class="text-title">下一次的更新</p>
      <p class="text-desc">不出意外下一次更新会弄的东西</p>
    </div>
    <div class="page-body">
      <p class="text-desc bold">班级课表</p>
      <p class="text-desc">没啥好说的，看看接下来上什么课。</p>
      <p class="text-desc bold">班级文件</p>
      <p class="text-desc">可以自由下载资料的地方...</p>
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
