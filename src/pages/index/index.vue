<template>
  <div v-if="isLoaded" class="container home">
    <div class="page-header">
      <div class="text-title">
        17级英语8班
      </div>
      <p class="text-desc">{{ isLogged ? '毕业快乐！🎓🎊' : '您尚未登记信息，请点击右下角「我」进行登记。'}}</p>
    </div>
    <div class="page-body">
      <ul class="button-list">
        <li v-for="service in serviceButtons"
            :key="service.name">
          <div class="button-item" hover-class="hover"
              :class="{ 'disabled': !isLogged || service.page == ''}"
              @click="goToPage(service.page, true)">
            <span>{{ service.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="environment != 'release'" class="footer">
      <p class="text-desc">您正在使用「{{ environment == 'develop' ? '开发版' : '体验版' }}」小程序！</p>
    </div>
  </div>
</template>

<script>
import ChannelUtil from '@/utils/channel'
export default {
  data () {
    return {
      serviceButtons: [
        {
          name: '课程表',
          page: 'timetable/index'
        }
      ],
      environment: ChannelUtil.getChannel(),
      isLoaded: false
    }
  },
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  methods: {
    goToPage (page, needLogged) {
      if ((needLogged && this.isLogged === false) || page == '') return
      wx.navigateTo({
        url: '/pages/' + page
      })
    },
    refreshUserInfo () {
      this.$store.commit('saveUserInfo', {})
      wx.showLoading({
        title: '刷新用户状态中...'
      })
      return wx.cloud.callFunction({
        name: 'getUserInfo'
      }).then(res => {
        switch (res.result.msg) {
          case 'ok':
            this.$store.commit('saveUserInfo', res.result.userInfo)
            break
          case 'notRegistered':
            wx.removeStorageSync('userInfo')
            break
          default:
            break
        }
      }).catch(() => {
        wx.showModal({
          content: '加载失败，请检查您的网络状况！',
          showCancel: false
        })
      }).then(() => {
        wx.hideLoading()
      })
    }
  },
  mounted () {
    const currentVersion = this.$store.state.version
    const oldVersion = wx.getStorageSync('version')
    if (oldVersion !== currentVersion || this.isLogged == false) {
      this.refreshUserInfo().then(() => {
        this.isLoaded = true
        if (oldVersion !== currentVersion) {
          wx.navigateTo({
            url: `/pages/changelog/index?version=${currentVersion}`
          })
          wx.setStorageSync('version', currentVersion)
        }
      })
    }
    wx.showLoading({
      title: '获取可用功能中...'
    })
    wx.cloud.callFunction ({
      name: 'getServiceButtons',
      data: {
        version: currentVersion
      }
    }).then(res => {
      this.serviceButtons = res.result.data
    }).catch(() => {
      wx.showModal({
        content: '加载失败，请检查您的网络状况！',
        showCancel: false
      })
    }).then(() => {
      wx.hideLoading()
      this.isLoaded = true
    })
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