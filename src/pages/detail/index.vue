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
      this.currentItem = e.mp.detail.current
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
    /* if (option.currentItem) {
      this.currentItem = option.currentItem
    } */
    this.$db.collection('homework').doc(this.courseId)
      .get().then(res => {
        wx.hideLoading()
        this.homeworkArray = res.data.homework
        this.courseName = res.data.name
        if (this.homeworkId === '0') {
          this.homeworkId = this.homeworkArray[0].id
        }
        this.currentItem = this.findHomeworkIndexById(this.homeworkId)
        this.changePageTitle()
      })
  },
  onShareAppMessage (result) {
    return {
      title: '作业详情',
      path: '/pages/detail/main?courseId=' + this.courseId + '&homeworkId=' + this.homeworkId
    }
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
