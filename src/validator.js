// This function determines if the query string is valid.
const isValidQl = (qlString) => {
  let k = 0
  for (let i = 0; i < qlString.length; i++) {
    if (qlString[i] === '{')
      k++
    else if (qlString[i] === '}')
      k--
    if (k === -1)
      return false
  }
  return k === 0
}

exports.isValidQl = isValidQl