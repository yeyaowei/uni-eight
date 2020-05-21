<template>
  <div class="page-body">
    <img class="tip-img block" src="/static/images/browserTip.png" mode="aspectFit">
    <div class="block">
      <p class="text-title bold">点击按钮复制下载链接</p>
      <text selectable="true" class="text-desc link">{{ downloadLink }}</text>
    </div>
    <div class="block">
      <p class="text-title bold">打开浏览器访问即可下载文件</p>
    </div>
    <div class="download-button">
      <div @click="copyLink" class="button-item" hover-class="hover">
        <span>复制链接</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      homeworkId: '',
      fileName: ''
    }
  },
  computed: {
    downloadLink () {
      return `https://api.wolfg.icu/${this.homeworkId}/${encodeURI(this.fileName)}`
    }
  },
  methods: {
    copyLink () {
      wx.setClipboardData({
        data: this.downloadLink
      })
    }
  },
  mounted () {
    const option = this.$root.$mp.query
    this.homeworkId = option.homeworkId
    this.fileName = option.fileName
  }
}
</script>

<style lang="scss">
.page-body {
  text-align: center;
  .text-title {
    font-size: 16px;
  }
  .text-desc {
    font-size: 12px;
  }
}
.download-button {
  margin-top: 40px;
}
.tip-img {
  width: 100%;
  height: 320px;
}
.link {
  word-wrap: break-word;
}
</style>
