<template>
  <div>
    <div class="page-header">
      <div class="text-title">
        作业
      </div>
      <p class="text-desc">目前有作业的科目有 {{ courseList.length }} 项</p>
      <p class="text-desc">点击可查看相应作业详情</p>

    </div>
    <div class="page-body">
      <div class="course-list">
        <div class="course-item" v-for="(course, i1) in courseList" :key="course.name">
          <div class="course-item-title" @click="navigateToDetail(course._id)">
            <span>{{ course.name }}</span>
            <span class="right">{{ course.homework.length }} 项</span>
          </div>
          <div class="course-item-body">
            <div class="homework-item" hover-class="hover" v-for="(homework, i2) in course.homework" :key="homework.name" @click="navigateToDetail(course._id, homework.id)">
              <span>{{ homework.name }}</span>
              <span class="right">{{ homework.eta }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeUtil from '@/utils/time'
export default {
  data () {
    return {
      courseList: []
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
          this.processCourseList(res.data)
          this.courseList = res.data
        })
    },
    navigateToDetail (courseId, homeworkId = '0') {
      wx.navigateTo({
        url: `/pages/detail/main?courseId=${courseId}&homeworkId=${homeworkId}`
      })
    },
    processCourseList (courseList) {
      for (let courseIndex = 0; courseIndex < courseList.length; courseIndex++) {
        const homeworks = courseList[courseIndex].homework
        for (let homeworkIndex = 0; homeworkIndex < homeworks.length; homeworkIndex++) {
          const homework = homeworks[homeworkIndex]
          homework.eta = this.getLargestTime(homework.endTime)
        }
      }
    },
    getLargestTime (endTime) {
      if (endTime.timestamp) {
        const temp = TimeUtil.getCountdownString(endTime.timestamp).split(' ')
        for (let index = 0; index < temp.length; index += 2) {
          const element = temp[index]
          if (+element === 0) {
            continue
          } else {
            return `${+temp[index]} ${temp[index + 1]}`
          }
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
.course-list {
  .course-item {
    margin-bottom: 20px
  }
}
.course-item {
  border-radius: 3px;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
  .course-item-title {
    font-size: 20px;
    padding: 18px 20px;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
  }
  .course-item-body {
    font-size: 16px;
    .homework-item {
      padding: 12px 20px;
      &.hover {
        background-color: #f9fafc;
      }
      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
}

.right {
  float: right;
}
</style>
