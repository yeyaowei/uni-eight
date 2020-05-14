<template>
  <div class="page-detail">
    <swiper class="swiper" indicator-dots="true">
      <swiper-item v-for="(homework, index) in homeworkArray" :key="index">
        <scroll-view scroll-y="true">
          <HomeworkDetail :homework="homework"/>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import HomeworkDetail from '@/components/HomeworkDetail'
export default {
  data () {
    return {
      course: {},
      homeworkArray: []
    }
  },
  components: {
    HomeworkDetail
  },
  mounted () {
    wx.showLoading({
      title: '加载中'
    })
    const option = this.$root.$mp.query
    this.$db.collection('homework').doc(option.id)
      .get().then(res => {
        wx.hideLoading()
        this.homeworkArray = res.data.homework
        wx.setNavigationBarTitle({
          title: res.data.name
        })
      })
    /*
    this.$wxhttp
      .get({
        url: option.id
      })
      .then(data => {
        this.homeworkArray = data.homework
        wx.setNavigationBarTitle({
          title: data.name
        })
      })
      */
  }
}
</script>

<style lang="scss">
.block {
  margin-bottom: 20px;
}
page, .page-detail {
  height: 100%;
}
.swiper {
  min-height: 100%;
}
scroll-view {
  height: 100%;
  overflow-y: scroll;
}
</style>
