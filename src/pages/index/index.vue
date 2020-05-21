<template>
  <div class="container home">
    <div class="page-header">
      <div class="text-title">
        17级英语8班
      </div>
      <p class="text-desc">{{ isLogged ? '不知道说什么...' : '您尚未登记信息，请点击右下角「我」进行登记。'}}</p>
    </div>
    <div class="page-body">
      <ul class="button-list">
        <li v-for="service in serviceButtons"
            :key="service.name">
          <div class="button-item" hover-class="hover"
              :class="{ 'disabled': !isLogged}"
              @click="goToPage(service.page, true)">
            <span>{{ service.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <p class="text-desc">暂时只有看作业这个功能，等后续开发...</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      serviceButtons: [
        {
          name: '作业详情',
          page: 'homework'
        }
      ]
    }
  },
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  methods: {
    goToPage (page, needLogged) {
      if (needLogged && this.isLogged === false) return
      wx.navigateTo({
        url: '/pages/' + page + '/main'
      })
    }
  }
}
</script>

<style lang="scss">
.footer {
  text-align: center;
  position: fixed;
  bottom: 24px;
  width: 100%;
}
.button-list {
  li {
    margin: 12px 0;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>