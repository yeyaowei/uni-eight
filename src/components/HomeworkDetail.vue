<template>
  <div class="container">
    <div class="page-header">
      <p class="text-title">{{ homework.name }}</p>
    </div>
    <div class="page-body">
      <div class="block">
        <p class="text-title">提交平台</p>
        <p class="text-desc">{{ homework.platform }}</p>
      </div>

      <div class="block">
        <p class="text-title">布置时间</p>
        <p class="text-desc">{{ startTimeText }}</p>
      </div>
      <div class="block">
        <p class="text-title">截止时间</p>
        <p class="text-desc">{{ endTimeText }}</p>
        <p class="text-desc bold" v-show="endCountdown != ''">{{ endCountdown }}</p>
      </div>
      <div class="block">
        <p class="text-title">作业内容</p>
        <p class="text-desc content">{{ contentReplace }}</p>
      </div>
      <div class="block">
        <div class="button-item transition" :class="{ 'disabled': isDone }" @click="markDoneState">
            <span>{{ isDone ? '已完成' : '未完成' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeUtil from '@/utils/time'
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
    },
    isDone () {
      return this.$store.state.homework.done.indexOf(this.homework.id) !== -1
    }
  },
  methods: {
    markDoneState () {
      this.$store.commit('setHomeworkDoneState', { id: this.homework.id, isDone: !this.isDone })
    },
    getCountdownString (timestamp) {
      const time = timestamp - Date.now()
      if (time <= 0) return '已截止'
      return TimeUtil.getTimeString(time)
    }
  },
  mounted () {
    const endTime = this.homework.endTime
    const startTime = this.homework.startTime
    if (endTime.timestamp) {
      this.endCountdown = '还有 ' + this.getCountdownString(endTime.timestamp)
      let id = setInterval(() => {
        this.endCountdown = '还有 ' + this.getCountdownString(endTime.timestamp)
      }, 1000)
      this.intervalIds.push(id)
    }

    if (startTime.text) {
      this.startTimeText = startTime.text
    } else {
      this.startTimeText = TimeUtil.formatTime(new Date(startTime.timestamp))
    }

    if (endTime.text) {
      this.endTimeText = endTime.text
    } else {
      this.endTimeText = TimeUtil.formatTime(new Date(endTime.timestamp))
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
</style>
