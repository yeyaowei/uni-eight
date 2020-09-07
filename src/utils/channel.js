function getChannel() {
  return wx.getAccountInfoSync().miniProgram.envVersion
}

export default {
  getChannel
}