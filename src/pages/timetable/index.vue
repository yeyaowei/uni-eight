<template>
  <div class="container new-type">
    <div v-show="isLoaded" class="page-body">
      <div class="block">
        <p class="text-title">Today</p>
        <p class="text-info">星期{{ weekDay }}，第 {{ todayWeek }} 周</p>
      </div>
      <div class="block">
        <p class="text-title">当前课程</p>
        <p v-if="step < 0" class="text-info">{{ step == -1 ? '早上好~' : '晚安！' }}</p>
        <p v-else-if="noCourseAnymore" class="text-info">本日课程已结束</p>
        <p v-else-if="isInRestTime == false" class="text-info">{{ currentCourse != null ? currentCourse.name : '无课' }}</p>
        
        <p v-else class="text-info">课间时间</p>
        <p class="text-extra">{{ timeRangeText }}</p>
      </div>
      <div v-if="!noCourseAnymore" class="block">
        <p class="text-title">距离{{ isInRestTime ? '上' : currentCourse == null ? '上' : '下' }}课时间</p>
        <p class="text-info">还有 {{ etaTimeText }}</p>
      </div>
      <div v-if="!noCourseAnymore" class="block">
        <p class="text-title">下节课程</p>
        <p v-if="nextCourse == null" class="text-info">无课</p>
        <template v-else>
          <p class="text-info">{{ nextCourse.name }}</p>
          <p class="text-extra">{{ nextCourse.room }}</p>
        </template>
      </div>
      <div class="block">
        <div class="button-item" hover-class="hover" @click="goToWeekly(today)">查看本周课程安排</div>
      </div>
      <div v-if="debug.enabled" class="block">
        <div class="input-box" style="margin-top: 10px">
          <input :placeholder="nowTimeText" v-model="debug.customTime" type="text" class="text-input">
        </div>
        <div class="button-item" style="margin-top: 10px" hover-class="hover" @click="setCustomTime()">Set time</div>
        <div class="button-item" style="margin-top: 10px" hover-class="hover" @click="setCustomTime(480000)">Add 8 minutes</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeUtil from '@/utils/time'
import CourseUtil from './timetable'
import ChannelUtil from '@/utils/channel'

const timeOfDay = CourseUtil.timeOfDay

const weekDay = ['日', '一', '二', '三', '四', '五', '六']
export default {
  data () {
    return {
      intervalIds: [],
      now: new Date(),
      isLoaded: false,
      courseListToday: [],
      debug: {
        customTime: '',
        enabled: ChannelUtil.getChannel() == 'develop'
      }
    }
  },
  computed: {
    nowTimeText () {
      return TimeUtil.formatTime(this.now, true)
    },
    today () {
      return TimeUtil.getRealDay(this.now.getDay())
    },
    midnightTimestamp () {
      return new Date(this.now).setHours(0,0,0,0)
    },
    todayWeek () {
      return CourseUtil.getSchoolWeekFromDate(this.now)
    },
    isNoCourseInList () {
      return this.courseListToday.every(course => course == null)
    },
    weekDay () {
      return weekDay[this.now.getDay()]
    },
    step () {
      return this.getStep(this.now.getTime())
    },
    isInRestTime () {
      if (this.step < 0) return true
      return this.step % 1 == 0.5
    },
    currentCourse () {
      if (this.isNoCourseInList) return null
      if (this.step < 0) return null
      return this.courseListToday[this.isInRestTime ? this.step - 0.5 : this.step]
    },
    nextCourse () {
      if (this.isNoCourseInList) return null
      const result = null
      if (this.step == -2) return null //已经下课了

      let tStep = this.step == -1 ? 0 : this.isInRestTime ? this.step + 0.5 : this.step + 1
      do {
        const course = this.courseListToday[tStep]
        if (course != null) return course
        tStep++
      } while (tStep < timeOfDay.length)
      return null
    },
    noCourseAnymore () {
      return (this.currentCourse == null || this.isInRestTime) && this.nextCourse == null
    },
    timeRangeText () {
      if (this.step == -1) {
        return `00:00 ~ ${TimeUtil.secondsToHm(timeOfDay[0][0] / 1000)}`
      } else if (this.step == -2) {
        const seconds = timeOfDay[timeOfDay.length - 1][1] / 1000
        return `${TimeUtil.secondsToHm(seconds)} ~ 00:00`
      } else if (this.isInRestTime) {
        const index = this.step - 0.5
        const first = timeOfDay[index][1] / 1000
        const last = timeOfDay[index + 1][0] / 1000
        return `${TimeUtil.secondsToHm(first)} ~ ${TimeUtil.secondsToHm(last)}`
      } else {
        const first = timeOfDay[this.step][0] / 1000
        const last = timeOfDay[this.step][1] / 1000
        return `${TimeUtil.secondsToHm(first)} ~ ${TimeUtil.secondsToHm(last)}`
      }
    },
    etaTimeText () {
      if (this.isNoCourseInList) return null
      const startTime = this.now.getTime() - this.midnightTimestamp
      
      const endTime = this.isInRestTime ? 
        this.nextCourse != null ? 
          timeOfDay[this.nextCourse.index][0] : 0 
      : this.currentCourse != null ? 
          timeOfDay[this.currentCourse.index][1] :
          this.nextCourse != null ?
            timeOfDay[this.nextCourse.index][0] : 0

      if (endTime == 0) return null
      return TimeUtil.getTimeString(endTime - startTime, true)
    }
  },
  mounted () {
    this.fetchTable()
    this.startTimeUpdating()
  },
  methods: {
    setCustomTime (add = 0) {
      if(add == 0) {
        this.now = new Date(this.debug.customTime)
        this.fetchTable()
      } else {
        this.now = new Date(this.now.getTime() + add)
      }
    },
    getCourseTimeFromIndex (index, startOrEnd) {
      return timeOfDay[index][startOrEnd]
    },
    fetchTable () {
      wx.showLoading({
        title: '加载中...'
      })

      wx.cloud.callFunction({
        name: 'getClasstable',
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
        if (res == null) {
          wx.hideLoading()
          wx.navigateBack()
          return
        }
        this.courseListToday = CourseUtil.process(CourseUtil.getValidCourses(res[this.today], this.$store.state.userInfo.exclusive, this.todayWeek))

        wx.hideLoading()
        this.isLoaded = true
      })
    },
    getStep (timestamp) {
      const onlyTime = timestamp - this.midnightTimestamp
      let step = -2
      for (let index = 0; index < timeOfDay.length; index++) {
        const courseTime = timeOfDay[index];
        if (onlyTime < courseTime[0]) {
          if (index == 0) {
            step = -1
          } else {
            step = index - 0.5
          }
          break;
        } else if (onlyTime <= courseTime [1]) {
          step = index
          break;
        }
      }
      return step
    },
    goToWeekly (day) {
      wx.navigateTo({
        url: `/pages/timetable/week?day=${day}`
      })
    },
    startTimeUpdating () {
      let id = setInterval(() => {
        if(this.debug.customTime == '') this.now = new Date()
      }, 1000)
      this.intervalIds.push(id)
    }
  }
}
</script>