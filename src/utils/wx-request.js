// const host = 'http://api.wolfg.icu/works/'
const host = 'http://192.168.2.153:8341/works/'

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers: {
        'content-type': 'application/json'
      },
      success: res => {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: res => {
        wx.hideLoading()
        reject(new Error('失败'))
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

export default {
  request,
  get,
  host
}
