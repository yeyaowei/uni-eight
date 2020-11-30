const semverSatisfies = require('semver/functions/satisfies')
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { version } = event
  return cloud.database().collection('serviceButtons').get().then(res => {
    const buttons = res.data
    const result = []
    for (const button of buttons) {
      if (!semverSatisfies(version, button.minimumVersion)) continue
      var temp = {
        name: button.name,
        page: button.enabled ? button.page : '',
      }
      var willBeAdd = button.visibled
      excluded = button.excludes.find(b => b.openid == OPENID)
      if(excluded) {
        if (excluded.visibled != undefined) willBeAdd = excluded.visibled
        if (excluded.enabled != undefined) temp.page = excluded.enabled ? button.page : ''
      }
      if (willBeAdd) result.push(temp)
    }
    return {
      data: result,
      errMsg: 'ok'
    }
  })
  
}