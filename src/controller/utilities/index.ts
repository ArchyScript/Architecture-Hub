export const formatNumbers = (number: number) => {
  if (number > 999 && number < 1000000) return (number / 1000).toFixed(1) + 'K'

  if (number > 1000000 && number < 1000000000)
    return (number / 1000000).toFixed(1) + 'M'

  if (number > 1000000000 && number < 1000000000000)
    return (number / 1000000000).toFixed(1) + 'B'

  if (number > 1000000000000) return (number / 1000000000000).toFixed(1) + 'T'

  if (number < 900) return number
}
