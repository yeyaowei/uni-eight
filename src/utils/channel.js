function getChannel() {
  console.log(wx.getAccountInfoSync().miniProgram.envVersion)
  return wx.getAccountInfoSync().miniProgram.envVersion
}

export default {
  getChannel
}