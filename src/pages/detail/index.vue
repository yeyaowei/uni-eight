<template>
  <div class="page-detail">
    <swiper :current="currentItem" class="swiper" indicator-dots="true" @change="currentItemChanged">
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
import ChannelUtil from '@/utils/channel'

export default {
  data () {
    return {
      homeworkArray: [],
      currentItem: 0,
      courseId: '',
      homeworkId: '',
      courseName: ''
    }
  },
  components: {
    HomeworkDetail
  },
  methods: {
    currentItemChanged (e) {
      this.currentItem = e.detail.current
    },
    findHomeworkIndexById (homeworkId) {
      return this.homeworkArray.findIndex(element => element.id === homeworkId)
    },
    changePageTitle () {
      wx.setNavigationBarTitle({
        title: `${this.courseName}`
      })
    }
  },
  mounted () {
    wx.showLoading({
      title: '加载中'
    })
    const option = this.$root.$mp.query
    this.courseId = option.courseId
    this.homeworkId = option.homeworkId
    wx.cloud.callFunction({
      name: 'getHomeworkById',
      data: {
        id: this.courseId,
        channel: ChannelUtil.getChannel()
      }
    }).then(res => {
        const result = res.result.data
        wx.hideLoading()
        this.homeworkArray = result.homework
        this.courseName = result.name
        if (this.homeworkId === '0') {
          this.homeworkId = this.homeworkArray[0].id
        }
        this.currentItem = this.findHomeworkIndexById(this.homeworkId)
        this.changePageTitle()
      })
  },
  onShareAppMessage (result) {
    return {
      title: `作业详情`,
      path: '/pages/detail/index?courseId=' + this.courseId + '&homeworkId=' + this.homeworkId
    }
  }
}
</script>

<style lang="scss">
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
