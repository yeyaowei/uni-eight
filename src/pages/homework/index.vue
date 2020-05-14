<template>
  <div class="container home">
    <div class="page-header">
      <div class="text-title">
        作业
      </div>
      <p class="text-desc">目前有作业的科目有 {{ courseList.length }} 项</p>
      <p class="text-desc">点击科目可查看详情</p>
    </div>
    <div class="page-body">
      <div class="course-list">
        <div class="course-list-item" v-for="course in courseList" :key="course._id" @click="checkDetail(course._id)">
          <span>{{ course.name }}</span>
          <span class="count">{{ course.count }} 份</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
    checkDetail (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + id
      })
    },
    fetchCourses () {
      wx.showLoading({
        title: '加载中'
      })
      const $ = this.$db.command.aggregate
      this.$db.collection('homework')
        .aggregate()
        .project({
          name: 1,
          count: $.size('$homework')
        })
        .end().then(res => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          this.courseList = res.list
        })
    }
  }
}
</script>

<style lang="scss">
.course-list-item {
  border-radius: 3px;
  font-size: 20px;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
  margin: 20px 0;
  padding: 20px;
  .count {
    float: right;
  }
}
.footer {
  text-align: center;
  position: fixed;
  bottom: 20px;
  width: 100%;
}
</style>