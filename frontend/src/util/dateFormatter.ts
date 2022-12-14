const dateFormatter = (date: number) => {
  const create_time = new Date(date)
  const now = new Date()
  let diff = (now.getTime() - create_time.getTime()) / (1000 * 60)
  if (diff < 60) {
    // 1시간 이내
    diff = Math.round(diff)
    return diff + '분 전'
  } else if (diff < 60 * 24) {
    diff = Math.round(diff / 60)
    return diff + '시간 전'
  } else {
    diff = Math.round(diff / (60 * 24))
    return diff + '일 전'
  }
}

export { dateFormatter }
