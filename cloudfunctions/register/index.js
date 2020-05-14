// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return db.collection('students')
  .where({
    name: event.name,
    id: event.id
  })
  .get()
  .then(res => {
    if(res.data.length == 0) {
      return {msg: '查无此人'}
    } else if(res.data[0]._openid) {
      return {msg: '此学生已经注册过了'}
    } else {
      return db.collection('students').doc(res.data[0]._id).update({
        data: {
          _openid: wxContext.OPENID
        }
      })
      .then(res => {
        return {msg: 'ok', userInfo: {
          openid: wxContext.OPENID,
          name: event.name,
          id: event.id
        }}
      })
    }
  })
}