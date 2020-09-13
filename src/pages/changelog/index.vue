<template>
  <div style="padding-bottom: 30px;">
    <div class="page-header">
      <p class="text-title">{{ version }} 版更新记录</p>
      <p class="text-desc">小程序已升级到新版本！</p>
      <p class="text-desc">本次更新天啦噜，太厉害了！</p>
      <p class="text-desc bold">为了这些东西一夜之间我白了（一根）头（发）...</p>
    </div>
    <div class="page-body">
      <p class="text-title">质量更新</p>
      <p class="text-desc">· 所有需要进行网络请求的地方都加入了超时提醒（不会一直转圈圈了）</p>
      <p class="text-desc">· 若网络不佳且本地存在缓存的情况下，作业查询与课程表都会使用本地缓存的版本</p>
      <p class="text-desc">十分感谢<span style="color: orange">叶露同学</span>的建议惹，大家快去夸夸他~🎉</p>
      <p class="text-title">课程表<span style="color: orange"> New!!!</span></p>
      <p class="text-desc">· 查看当前校历第几周</p>
      <p class="text-desc">· 查看本周与下周一的课程安排</p>
      <p class="text-desc">· 二外课程也会根据您选择的二外科目而改变</p>
      <p class="text-title">作业详情</p>
      <p class="text-desc">· 转发页面时将会显示科目名称</p>
      <p class="text-title">个人信息</p>
      <p class="text-desc">· 界面改版，可显示学号及二外科目、可重复查看版本更新记录</p>
      <p class="text-desc bold">Bug 修复</p>
      <p class="text-desc">· 修复作业详情的图片尺寸不对劲的问题</p>
      <p class="text-desc">· 修复作业列表无法下拉刷新的问题</p>
      <p class="text-desc bold">更多内容我忘记了，自己慢慢发现吧！</p>
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
