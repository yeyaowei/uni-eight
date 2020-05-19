<template>
  <span class="right">{{ text }}</span>
</template>

<script>
import TimeUtil from '@/utils/time'
export default {
  props: ['homework'],
  computed: {
    text () {
      const isDone = this.getHomeworkDoneState(this.homework.id)
      if (isDone) {
        return `已完成 (${this.eta})`
      } else {
        return this.eta
      }
    },
    eta () {
      const endTime = this.homework.endTime
      const timestamp = endTime.timestamp - Date.now()
      if (endTime.timestamp) {
        if (timestamp <= 0) return '已截止'
        return this.getLargestTime(timestamp)
      }
    }
  },
  methods: {
    getLargestTime (timestamp) {
      const temp = TimeUtil.getTimeString(timestamp).split(' ')
      for (let index = 0; index < temp.length; index += 2) {
        const element = temp[index]
        if (+element === 0) {
          continue
        } else {
          return `${+temp[index]} ${temp[index + 1]}`
        }
      }
    },
    getHomeworkDoneState (homeworkId) {
      return this.$store.state.homework.done.indexOf(homeworkId) !== -1
    }
  }
}
</script>