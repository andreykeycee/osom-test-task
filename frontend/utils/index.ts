export const formatNumber = (number: string, withCommas: boolean = false) => {
  const localed = parseInt(number).toLocaleString('en-US')

  return withCommas
    ? localed
    : localed.replace(',', ' ')
}