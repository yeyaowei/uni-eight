<template>
  <div>
    <div class="page-header">
      <div class="text-title">
        <p>作业</p>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="float: left;">
          <p class="text-desc">目前有作业的科目有 {{ courseList.length }} 项</p>
          <p class="text-desc">点击可查看相应作业详情</p>
        </div>
        <div style="flex: auto;">
          <div class="button-item" hover-class="hover" style="float: right; " @click="sortToggle = !sortToggle">排序</div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div v-show="!sortToggle" class="course-list">
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
      <div v-show="sortToggle" class="course-list">
        <div class="card">
          <div class="card-body">
            <div class="card-list-item" style="display: flex; align-items: center;" hover-class="hover" v-for="homework in courseListTwo" :key="homework">
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
export default {
  components: {
    ETA,
    Count
  },
  data () {
    return {
      courseList: [],
      courseListTwo: [],
      sortToggle: false
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
      this.$db.collection('homework')
        .get().then(res => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          this.courseList = res.data
          this.courseListTwo = this.courseList.map(course => course.homework.map(homework => ({...homework, course: course.name}))).flat()
          this.courseListTwo.sort((a, b) => {
            if (!a.endTime.timestamp) {
              return 1
            } else if (!b.endTime.timestamp) {
              return -1
            } else {
              return a.endTime.timestamp - b.endTime.timestamp
            }
          })
        })
    },
    navigateToDetail (courseId, homeworkId = '0') {
      wx.navigateTo({
        url: `/pages/detail/main?courseId=${courseId}&homeworkId=${homeworkId}`
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
