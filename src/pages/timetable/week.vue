<template>
  <div class="week-table" v-if="isLoaded">
    <swiper :current="currentItem" class="swiper" indicator-dots="true" @change="currentItemChanged">
      <swiper-item v-for="day in weekList" :key="day.date">
        <scroll-view scroll-y="true">
          <Schedule :date-time="day.date" :course-list="day.courses" :next-week-course-list="day.nextWeekCourses"/>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Schedule from './components/schedule'
import CourseUtil from './timetable'
import TimeUtil from '@/utils/time'

export default {
  components: {
    Schedule
  },
  data () {
    return {
      isLoaded: false,
      today: new Date(),
      weekList: [],
      currentItem: 0
    }
  },
  computed: {
    realToday () {
      return TimeUtil.getRealDay(this.today.getDay())
    }
  },
  mounted () {
    this.currentItem = this.$root.$mp.query.day
    wx.showLoading({
      title: '加载本周课表...'
    })
    wx.cloud.callFunction({
      name: 'getClasstable'
    }).then(res => {
      this.$store.commit('saveCache', {
        name: 'timetable',
        data: res.result
      })
      return res.result
    }).catch(res => {
      const timetableCache = this.$store.state.cache.timetable
      if (timetableCache != null) {
        wx.showToast({
          title: '加载课程表失败，将使用本地缓存。',
          icon: 'none'
        })
        return timetableCache
      }
      wx.showModal({
        title: '课程表',
        content: '加载课程表失败！请检查您的网络！',
        showCancel: false
      })
      return null
    }).then(res => {
      this.process(res)
      wx.hideLoading()
      this.isLoaded = true
    })
  },
  methods: {
    currentItemChanged (e) {
      this.currentItem = e.detail.current
    },
    process (classtable) {
      const firstDayThisWeek = new Date(this.today.getTime() - this.realToday * 24 * 60 * 60 * 1000)
      const result = []
      for (let day = 0; day < 8; day++) {
        const courseList = classtable[day == 7 ? 0 : day];
        const date = new Date(firstDayThisWeek.getTime() + day * 24 * 60 * 60 * 1000)
        const week = CourseUtil.getSchoolWeekFromDate(date)
        result.push({
          date: date.getTime(),
          courses: CourseUtil.getValidCourses(courseList, this.$store.state.userInfo.exclusive, week),
          nextWeekCourses: CourseUtil.getValidCourses(courseList, this.$store.state.userInfo.exclusive, week + 1)
        })
      }
      this.weekList = result
    }
  }
}
</script>

<style>
.swiper {
  min-height: 100%;
}
page, .week-table {
  height: 100%;
}
scroll-view {
  height: 100%;
  overflow-y: scroll;
}
</style>