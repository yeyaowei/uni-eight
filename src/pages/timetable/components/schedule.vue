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
          <p v-if="checkEndNextWeek(course)" class="text-extra bold">下周结课</p>
          <p class="text-info">{{ course.name }}</p>
          <p class="text-extra">
            {{ course.room }}
          </p>
      </div>
      <div v-if="onlyNextWeekCourses.length != 0">
        <div style="display: flex; align-items: center; margin-bottom: 10px">
          <span style="letter-spacing: 2px; color: #666; font-size: 20px">下周新增的课程</span>
          <span style="margin-left: 8px; flex-grow: 1; border-top: 2px solid #666">
          </span>
        </div>
        <div v-for="course in onlyNextWeekCourses" :key="course.index" class="block">
          <p class="text-title">{{ getTimeRangeText(course) }}</p>
          <p class="text-info">{{ course.name }}</p>
          <p class="text-extra">
            {{ course.room }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseUtil from '../timetable'
import TimeUtil from '@/utils/time'

const weekDay = ['日', '一', '二', '三', '四', '五', '六']
export default {
  props: ['dateTime', 'courseList', 'nextWeekCourseList'],
  data () {
    return {
      date: new Date(this.dateTime),
    }
  },
  computed: {
    schoolWeek () {
      return CourseUtil.getSchoolWeekFromDate(new Date(this.dateTime))
    },
    onlyNextWeekCourses () {
      return this.nextWeekCourseList.filter(course => {
        return !course.validWeek.includes(this.schoolWeek)
      })
    },
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
      return `星期${weekDay[this.date.getDay()]}，第 ${this.schoolWeek} 周`
    }
  },
  methods: {
    getTimeRangeText (course) {
      const startText = TimeUtil.secondsToHm(CourseUtil.timeOfDay[course.index][0] / 1000)
      const endText = TimeUtil.secondsToHm(CourseUtil.timeOfDay[course.index - 1 + course.count][1] / 1000)
      const startIndex = course.index + 1
      const endIndex = course.index + course.count
      return `${startIndex}-${endIndex} 节 / ${startText} ~ ${endText}`
    },
    checkEndNextWeek (course) {
      return this.schoolWeek == course.validWeek[course.validWeek.length - 1]
    }
  }
}
</script>

<style>

</style>