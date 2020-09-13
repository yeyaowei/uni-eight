// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function process(origin, day) {
  const dayTable = origin[day]
  return dayTable || null
}
// 云函数入口函数
exports.main = async (event, context) => {
  const databaseName = 'classtable'
  const { day } = event
  return await cloud.database().collection(databaseName).doc('original').get().then(res => {
    const result = process(res.data.classtable, day)
    return result
  })
}