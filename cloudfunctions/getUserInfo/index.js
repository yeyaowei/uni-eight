// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return db.collection('students').where({
    _openid: wxContext.OPENID
  }).get().then(res => {
    if(res.data.length == 0) {
      return {msg: 'notRegistered'}
    } else {
      return {msg: 'ok', userInfo: {
        openid: wxContext.OPENID,
        name: res.data[0].name,
        id: res.data[0].id,
        exclusive: res.data[0].exclusive
      }}
    }
  })
}