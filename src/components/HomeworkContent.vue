<template>
  <div>
    <text v-if="isImageLoading && isImageExisted" class="image-loading">{{ imageLoadingText }}</text>
    <image v-show="isImageExisted && !isImageLoading" class="homework-image" :class="{ 'no-margin-bottom': !isTextExisted }" mode="widthFix" 
      :src="content.img"
      @click="previewImage"
      @load="imageLoaded"
      @error="imageError"/>
    <text v-if="isTextExisted" user-select="true" class="text-desc">{{ content.text }}</text>
  </div>
</template>

<script>
export default {
  props: ['content'],
  data () {
    return {
      isImageExisted: this.content.hasOwnProperty('img'),
      isTextExisted: this.content.hasOwnProperty('text'),
      isImageLoading: true,
      imageLoadingText: '图片加载中'
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
      this.isImageLoading = false
    },
    imageError () {
      this.imageLoadingText = "图片加载失败！"
    }
  }
}
</script>

<style lang="scss">
.homework-image {
  border-radius: 2px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
  margin: 20px auto 20px;
  display: block;
  width: 100%;
  &.no-margin-bottom {
    margin-bottom: 0;
  }
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