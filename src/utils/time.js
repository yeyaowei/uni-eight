function getTimeString (timestamp) {
  const timeLeft = parseInt(timestamp / 1000)
  const d = addZero(parseInt(timeLeft / (24 * 60 * 60)))
  const h = addZero(parseInt(timeLeft / (60 * 60) % 24))
  const m = addZero(parseInt(timeLeft / 60 % 60))
  const s = addZero(parseInt(timeLeft % 60))
  return `${d} 天 ${h} 时 ${m} 分 ${s} 秒`
}

function formatTime (date) {
  const month = date.getMonth() + 1
  const day = date.getDate()

  let hour = date.getHours()
  const noon = hour > 12 ? '下午' : '上午'
  hour = hour > 12 ? hour - 12 : hour

  const minute = date.getMinutes()

  const t1 = `${month} 月 ${day} 日`
  const t2 = `${noon} ${addZero(hour)}:${addZero(minute)}`
  return `${t1} ${t2}`
}

function addZero (i) {
  return i < 10 ? '0' + i : i + ''
}

export default {
  getTimeString,
  addZero,
  formatTime
}
