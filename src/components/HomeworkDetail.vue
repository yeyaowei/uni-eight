<template>
  <div class="container">
    <div class="page-header">
      <p class="text-title">{{ homework.name }}</p>
      <p class="text-desc">滑动至页面末尾可标记作业完成状态</p>
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
        <text selectable="true" class="text-desc content">{{ contentReplace }}</text>
      </div>
      <div v-if="isFileExisted">
        <div class="block">
          <div class="card">
            <div class="card-title">
              <p>文件列表</p>
              <p class="text-desc">点击文件名获取下载链接</p>
            </div>
            <div class="card-body">
              <div v-for="file in computedFiles" :key="file.name" class="card-list-item file-item" hover-class="hover">
                <span @click="toDownloadPage(file.originalName)">{{ file.name }}</span>
                <span class="right">{{ file.size }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="button-item" hover-class="hover" :class="{ 'disabled': isDone }" @click="markDoneState">
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
    },
    files () {
      return this.homework.files
    },
    isFileExisted () {
      return this.files.length !== 0
    },
    computedFiles () {
      return this.files.map(file => {
        return {
          originalName: file.name,
          name: this.shortenText(file.name),
          size: this.formatSize(file.size)
        }
      })
    }
  },
  methods: {
    markDoneState () {
      this.$store.commit('setHomeworkDoneState', { id: this.homework.id, isDone: !this.isDone })
    },
    getCountdownString (timestamp) {
      const time = timestamp - Date.now()
      if (time <= 0) return '已截止'
      return `还有 ${TimeUtil.getTimeString(time)}`
    },
    formatSize (raw) {
      const unit = ['Bytes', 'KB', 'MB', 'GB']
      let result = raw
      let index = 0
      while (result > 1024) {
        result /= 1024
        index += 1
      }
      return `${result.toFixed(2)} ${unit[index]}`
    },
    shortenText (text) {
      if (text.length >= 16) {
        return `${text.slice(0, 16)}...`
      }
      return text
    },
    toDownloadPage (name) {
      wx.navigateTo({
        url: `/pages/download/index?homeworkId=${this.homework.id}&fileName=${name}`
      })
    }
  },
  mounted () {
    const endTime = this.homework.endTime
    const startTime = this.homework.startTime
    if (endTime.timestamp) {
      this.endCountdown = this.getCountdownString(endTime.timestamp)
      let id = setInterval(() => {
        this.endCountdown = this.getCountdownString(endTime.timestamp)
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
.block .card {
  margin-top: 16px;
}
.content {
  white-space: pre-wrap;
}
.file-item {
  font-size: 14px;
}
</style>
