<template>
  <div class="new-type">
    <div class="page-body">
      <div class="block">
        <p class="text-title">{{ dateText }}{{ isToday ? ', Today' : isTomorrow ? ', Tomorrow' : '' }}</p>
        <p class="text-info">{{ dateInfoText }}</p>
      </div>
      <div v-if="courseList.length == 0" class="block">
        <p class="text-info">本日无课</p>
      </div>
      <div v-for="course in courseList" :key="course.index" class="block">
          <p class="text-title">{{ getTimeRangeText(course) }}</p>
          <p class="text-info">{{ course.name }}</p>
          <p class="text-extra">
            {{ course.room }}
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import CourseUtil from '../timetable'
import TimeUtil from '@/utils/time'

const weekDay = ['日', '一', '二', '三', '四', '五', '六']
export default {
  props: ['dateTime', 'courseList'],
  data () {
    return {
      date: new Date(this.dateTime)
    }
  },
  computed: {
    isToday () {
      return new Date().setHours(0, 0, 0, 0) == new Date(this.date).setHours(0, 0, 0, 0)
    },
    isTomorrow () {
      return new Date(this.date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) == 86400000
    },
    dateText () {
      return `${this.date.getMonth() + 1} 月 ${this.date.getDate()} 日`
    },
    dateInfoText () {
      return `星期${weekDay[this.date.getDay()]}，第 ${CourseUtil.getSchoolWeekFromDate(this.date)} 周`
    }
  },
  methods: {
    getTimeRangeText (course) {
      const startText = TimeUtil.secondsToHm(CourseUtil.timeOfDay[course.index][0] / 1000)
      const endText = TimeUtil.secondsToHm(CourseUtil.timeOfDay[course.index - 1 + course.count][1] / 1000)
      const startIndex = course.index + 1
      const endIndex = course.index + course.count
      return `${startIndex}-${endIndex} 节 / ${startText} ~ ${endText}`
    }
  }
}
</script>

<style>

</style>