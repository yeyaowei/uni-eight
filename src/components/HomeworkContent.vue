<template>
  <div>
    <text v-if="isImageLoading && isImageExisted" class="image-loading">图片加载中</text>
    <img v-show="isImageExisted && !isImageLoading" class="homework-image" :src="content.img" @click="previewImage" @load="imageLoaded" @error="imageError"/>
    <text v-if="isTextExisted" selectable="true" class="text-desc">{{ content.text }}</text>
  </div>
</template>

<script>
export default {
  props: ['content'],
  data () {
    return {
      isImageExisted: this.content.hasOwnProperty('img'),
      isTextExisted: this.content.hasOwnProperty('text'),
      isImageLoading: true
    }
  },
  methods: {
    previewImage () {
      wx.showLoading({
        title: '图片加载中'
      })
      wx.cloud.getTempFileURL({
        fileList: [this.content.img]
      }).then(res => {
        const url = res.fileList[0].tempFileURL
        wx.hideLoading()
        wx.previewImage({
          current: url,
          urls: [url]
        })
      })
      
    },
    imageLoaded () {
      console.log('image loaded')
      this.isImageLoading = false
    },
    imageError (res) {
      console.log(res)
    }
  }
}
</script>

<style>
.homework-image {
  border-radius: 2px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
  margin: 20px auto 20px;
  display: block;
}
.image-loading {
  letter-spacing: 2px;
  text-align: center;
  display: block;
  color: #888888;
  font-size: 24px;
  margin: 50px auto;
}
</style>