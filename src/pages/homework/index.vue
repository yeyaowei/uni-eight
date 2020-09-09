<template>
  <div>
    <div class="page-header">
      <div class="text-title">
        <p>作业</p>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="float: left;">
          <p class="text-desc">目前有 {{ courseListTwo.length }} 项作业</p>
          <p class="text-desc">点击可查看相应作业详情</p>
        </div>
        <div style="flex: auto;">
          <div class="button-item" hover-class="hover" style="float: right; " @click="sortedByTime = !sortedByTime">排序</div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div v-if="!sortedByTime" class="course-list">
        <div class="card" v-for="(course, i1) in courseList" :key="i1">
          <div class="card-title" @click="navigateToDetail(course._id)">
            <span>{{ course.name }}</span>
            <Count :homework-list="course.homework" />
          </div>
          <div class="card-body">
            <div class="card-list-item" hover-class="hover" v-for="(homework, i2) in course.homework" :key="i2" @click="navigateToDetail(course._id, homework.id)">
              <span>{{ homework.name }}</span>
              <ETA :homework="homework"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="sortedByTime && courseListTwo.length != 0" class="course-list">
        <div class="card">
          <div class="card-body">
            <div @click="navigateToDetail(homework.courseId, homework.id)" class="card-list-item" style="display: flex; align-items: center;" hover-class="hover" v-for="homework in courseListTwo" :key="homework">
              <div style="float: left;">
                <p>{{ homework.name }}</p>
                <p class="text-desc">{{ homework.course }}</p>
              </div>
              <div style="flex: auto;">
                <ETA :homework="homework" />
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ETA from './ETA.vue'
import Count from './Count.vue'
import ChannelUtil from '@/utils/channel'

export default {
  components: {
    ETA,
    Count
  },
  data () {
    return {
      courseList: [],
      courseListTwo: []
    }
  },
  computed: {
    sortedByTime: {
      get () {
        return this.$store.state.homework.sortedByTime
      },
      set (newValue) {
        this.$store.commit('setHomeworkValue', {name: 'sortedByTime', value: newValue})
      }
    }
  },
  mounted () {
    this.fetchCourses()
  },
  onPullDownRefresh () {
    this.fetchCourses()
  },
  methods: {
    fetchCourses () {
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud.callFunction({
        name: 'getHomeworkList',
        data: {
          channel: ChannelUtil.getChannel()
        }
      }).then(res => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          this.courseList = res.result.data
          this.courseListTwo = this.courseList.map(course => course.homework.map(homework => ({...homework, course: course.name, courseId: course._id}))).flat()
          
          // 清除无效作业完成状态
          const homeworkIdList = this.courseListTwo.map(homework => homework.id)
          this.$store.dispatch('removeInvalidHomework', homeworkIdList)

          const now = Date.now()
          this.courseListTwo.sort((a, b) => {
            if (!a.endTime.timestamp) {
              return 1
            } else if (!b.endTime.timestamp) {
              return -1
            } else if (a.endTime.timestamp - now < 0) {
              return 1
            } else if (b.endTime.timestamp - now < 0) {
              return -1
            } else {
              return a.endTime.timestamp - b.endTime.timestamp
            }
          })
        })
    },
    navigateToDetail (courseId, homeworkId = '0') {
      wx.navigateTo({
        url: `/pages/detail/index?courseId=${courseId}&homeworkId=${homeworkId}`
      })
    }
  }
}
</script>

<style lang="scss">
.course-list {
  .card {
    margin-bottom: 20px
  }
}

</style>
