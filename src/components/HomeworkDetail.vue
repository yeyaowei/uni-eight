<template>
  <div class="container">
    <div class="page-body detail">
      <div class="block">
        <p class="text-title">提交平台</p>
        <p class="text-desc">{{ homework.platform }}</p>
      </div>

      <div class="block">
        <p class="text-title">布置时间</p>
        <p class="text-desc">{{ startTimeText }}</p>
      </div>
      <div class="block">
        <p class="text-title">截至时间</p>
        <p class="text-desc">{{ endTimeText }}</p>
        <p class="text-desc" v-show="endCountdown != ''">还有 {{ endCountdown }}</p>
      </div>
      <div class="block">
        <p class="text-title">作业内容</p>
        <p class="text-desc content">{{ contentReplace }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import timeUtil from '@/utils/time'
export default {
  props: ['homework'],
  data () {
    return {
      intervalIds: [],
      endCountdown: '',
      startTimeText: '',
      endTimeText: ''
    }
  },
  computed: {
    contentReplace () {
      return this.homework.content.replace(/\\n/g, '\n')
    }
  },
  mounted () {
    const endTime = this.homework.endTime
    const startTime = this.homework.startTime
    if (endTime.timestamp) {
      this.endCountdown = timeUtil.getCountdownString(endTime.timestamp)
      let id = setInterval(() => {
        this.endCountdown = timeUtil.getCountdownString(endTime.timestamp)
      }, 1000)
      this.intervalIds.push(id)
    }

    if (startTime.text) {
      this.startTimeText = startTime.text
    } else {
      this.startTimeText = timeUtil.formatTime(new Date(startTime.timestamp))
    }

    if (endTime.text) {
      this.endTimeText = endTime.text
    } else {
      this.endTimeText = timeUtil.formatTime(new Date(endTime.timestamp))
    }
  }
}
</script>

<style lang="scss">
.block {
  margin-bottom: 20px;
}
.content {
  white-space: pre-wrap;
}
.detail {
  margin-top: 40px;
}
</style>
