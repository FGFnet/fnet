import dayjs from 'dayjs'

const dateFormatter = (date: string | number) => {
  const create_time = dayjs(date)
  const now = dayjs()
  let diff = now.diff(create_time, "minute")
  if (diff < 60) {
    // 1시간 이내
    diff = Math.round(diff)
    return diff + '분 전'
  } else if (diff < 60 * 24) {
    diff = Math.round(diff / 60)
    return diff + '시간 전'
  } else if (diff < 60 * 24 * 24){
    diff = Math.round(diff / (60 * 24))
    return diff + '일 전'
  } else {
    return create_time.format("YYYY-MM-DD")
  }
}

export { dateFormatter }
