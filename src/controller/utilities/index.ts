export const formatNumbers = (number: number) => {
  if (number > 999 && number < 1000000) return (number / 1000).toFixed(1) + 'K'

  if (number > 1000000 && number < 1000000000)
    return (number / 1000000).toFixed(1) + 'M'

  if (number > 1000000000 && number < 1000000000000)
    return (number / 1000000000).toFixed(1) + 'B'

  if (number > 1000000000000) return (number / 1000000000000).toFixed(1) + 'T'

  if (number < 900) return number
}

export const formatDateAndTime = (createAt: string) => {
  const created_date = new Date(createAt)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const fullMonthsTexts = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const year = created_date.getFullYear()
  const month = months[created_date.getMonth()]
  const fullMonthsText = fullMonthsTexts[created_date.getMonth()]
  let date: any = created_date.getDate()
  let hours: any = created_date.getHours()
  let minutes: any = created_date.getMinutes()
  let seconds: any = created_date.getSeconds()

  // am or pm format
  const am_or_pm = hours >= 12 ? 'pm' : 'am'
  // hours format
  hours %= 12
  hours = hours || 12

  date = date <= 9 ? `0${date}` : date
  hours = hours <= 9 ? `0${hours}` : hours
  minutes = minutes <= 9 ? `0${minutes}` : minutes
  seconds = seconds <= 9 ? `0${seconds}` : seconds

  const formattedDate = `${month} ${date}, '${year.toString().slice(2)}`
  const formattedFullDate = `${fullMonthsText} ${date}, ${year}`
  const formattedTime = `${hours}:${minutes} ${am_or_pm}`

  return { formattedDate, formattedTime, formattedFullDate }
}

export const getDisplayProfilePicture = (profile_image: any, gender: any) => {
  const default_images = {
    male: `https://cdn5.vectorstock.com/i/thumb-large/85/94/person-gray-photo-placeholder-man-silhouette-sign-vector-23838594.jpg`,
    female: `https://cdn1.vectorstock.com/i/thumb-large/46/55/person-gray-photo-placeholder-woman-vector-22964655.jpg`,
    random: `https://cdn1.vectorstock.com/i/thumb-large/71/90/blank-avatar-photo-icon-design-vector-30257190.jpg`,
  }

  let avatar = ''

  if (profile_image !== '') return (avatar = profile_image)

  if (gender === 'male') return (avatar = default_images.male)
  if (gender === 'female') return (avatar = default_images.female)
  else return (avatar = default_images.random)
}
