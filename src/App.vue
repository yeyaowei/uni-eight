<script>
import Vue from 'vue'

export default {
  onLaunch () {
    wx.cloud.init({
      env: 'class-eight-01fjv',
      traceUser: true
    })
    Vue.prototype.$db = wx.cloud.database()
    const updateManager = wx.getUpdateManager()

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '小程序有新版本啦！快点点击确认更新吧！！！',
        success (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  }
}
</script>

<style lang="scss">
.page-header {
  .text-title {
    font-size: 32px;
  }
  padding: 30px 30px 30px;
}

.page-body {
  padding: 0 30px;
}
.block {
  margin-bottom: 20px;
}
.text-title {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.text-desc {
  color: #888888;
  font-size: 14px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
}

.button-item {
  border-radius: 3px;
  color: #212529;
  font-size: 20px;
  background-color: #FFD161;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  text-align: center;
  transition: background-color .2s,
              border .2s,
              color .2s,
              box-shadow .2s;
  &.disabled {
    background-color: #f3f3f3;
    border: 1px solid #eeeeee;
    color: #cccccc;
    box-shadow: none;
  }
  &.hover {
    box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
  }
}
.bold {
  font-weight: 600;
}
.right {
  float: right;
}

.card {
  border-radius: 3px;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
  .card-title {
    font-size: 20px;
    padding: 18px 20px;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
  }
  .card-body {
    font-size: 16px;
  }
  .card-list-item {
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
</style>
