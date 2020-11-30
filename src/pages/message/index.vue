<template>
  <div v-if="isLoaded" class="container">
    <div class="page-header">
      <p class="text-title">{{ message.name }}</p>
      <p class="text-desc">{{ message.description }}</p>
    </div>
    <div class="page-body">
        <template v-for="content in message.content">
          <homework-content :content="content" :key="content"/>
        </template>
    </div>
  </div>
</template>

<script>
import HomeworkContent from '@/components/HomeworkContent'
export default {
  components: {
    HomeworkContent
  },
  data () {
    return {
      message: {},
      isLoaded: false
    }
  },
  mounted () {
    wx.showLoading({
    title: '获取内容中...'
    })
    const option = this.$root.$mp.query
    wx.cloud.callFunction({
      name: 'getMessage',
      data: {
        id: option.messageId
      }
    }).then(res => {
      this.message = res.result.data
    }).then(() => {
      wx.hideLoading()
      this.isLoaded = true
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        content: '加载失败，请检查您的网络状况！',
        showCancel: false
      }).then(() => {
        wx.navigateBack()
      })
      
    })
  }
}
</script>

<style lang="scss">
.content {
  white-space: pre-wrap;
}
</style>
