// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const databaseName = 'homework' + (event.channel == 'release' ? '' : '-' + event.channel)
  return cloud.database().collection(databaseName).get()
}